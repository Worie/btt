import * as CommonUtils from '../common/util';
import * as Types from '../../types';

export class Trigger {
  // holds the uuid of the newly created / initialized trigger
  private uuid: string;
  
  // holds the name of the newly created / initialized trigger
  private name: string;

  // holds the config of the current instance
  private config: Types.IBTTConfig;
  
  /**
   * Constructs the Trigger instance, sets the uuid and name for further calls
   * @param {*} config 
   */
  public constructor(
    config: Types.IBTTConfig,
    triggerConfig: Types.ITriggerConfig
  ) {
    this.uuid = triggerConfig.uuid;
    this.name = triggerConfig.name;

    this.config = config;
  }

  /**
   * Calls the given trigger. Based on the data it was constructed with
   * the method of invoke varies
   */
  invoke(): Promise<void> {
    // if this is a named trigger
    if (this.name) {
      // perform a named trigger execution
      return CommonUtils.makeAction(
        'trigger_named',
        { trigger_name: this.name },
        this.config,
      );
      
    // if this was a generic trigger
    } else if (this.uuid) {
      // executre the actions for this trigger
      return CommonUtils.makeAction(
        'execute_assigned_actions_for_trigger',
        { uuid: this.uuid },
        this.config,
      );
    }
  }

  /**
   * Updates the trigger data with given JSON
   * @param {*} data 
   */
  update(data: any): Promise<void> {
    if (!data) {
      console.warn('No update data passed to Trigger');
      return;
    }

    // update the trigger with given json
    return CommonUtils.makeAction(
      'update_trigger',
      {
        uuid: this.uuid,
        json: JSON.stringify(data),
      },
      this.config,
    );
  }
};

/**
 * Creates an instances of Trigger with specified config
 */
export class FTrigger {
  private config: Types.IBTTConfig;

  public constructor(config: Types.IBTTConfig) {
    this.config = config;
  }

  /**
   * Deletes a trigger of given uuid
   * @param uuid 
   */
  public async delete(uuid: string) {
    return CommonUtils.makeAction(
      'delete_trigger',
      { uuid },
      this.config,
    );
  };

  /**
   * Creates a new trigger
   * @param config 
   */
  public async create(config: Types.ITriggerConfig): Promise<Trigger> {
    await CommonUtils.makeAction(
      'add_new_trigger',
      {
        json: JSON.stringify(config),
      },
      this.config,
    );

    return new Trigger(
      this.config,
      config,
    );
  }

  /**
   * Returns existing trigger
   * @param config 
   */
  public get(config: Types.ITriggerConfig): Trigger {
    return new Trigger(this.config, config);
  }

  /**
   * Triggers an action / trigger of specified json
   */
  public async invoke(json: any) {
    return CommonUtils.makeAction(
      'trigger_action',
      {
        json: JSON.stringify(json),
      },
      this.config,
    );
  }
}