import CommonUtils from './util';
import * as Types from '../types/types';

export class Trigger {
  // holds the uuid of the newly created / initialized trigger
  private uuid: string;
  
  // holds the name of the newly created / initialized trigger
  private name: string;

  // holds the config of the current instance
  private config: Types.AppConfig;
  
  /**
   * Constructs the Trigger instance, sets the uuid and name for further calls
   * @param {*} config 
   */
  public constructor(
    config: Types.AppConfig,
    triggerConfig: Types.TriggerConfig
  ) {
    this.uuid = triggerConfig.uuid;
    this.name = triggerConfig.name;

    this.config = config;
  }

  /**
   * Calls the given trigger. Based on the data it was constructed with
   * the method of invoke varies
   */
  invoke(): Promise<Types.CallResult> {
    // if this is a named trigger
    if (this.name) {
      // perform a named trigger execution
      return CommonUtils.callBetterTouchTool(
        'trigger_named',
        { trigger_name: this.name },
        this.config,
        false,
      );
      
    // if this was a generic trigger
    } else if (this.uuid) {
      // executre the actions for this trigger
      return CommonUtils.callBetterTouchTool(
        'execute_assigned_actions_for_trigger',
        { uuid: this.uuid },
        this.config,
        false,
      );
    }
  }

  /**
   * Updates the trigger data with given JSON
   * @param {*} data 
   */
  update(data: Types.BttPayload): Promise<Types.CallResult> {
    if (!data) {
      console.warn('No update data passed to Trigger');
      return;
    }

    // update the trigger with given json
    return CommonUtils.callBetterTouchTool(
      'update_trigger',
      {
        uuid: this.uuid,
        json: data,
      },
      this.config,
      false,
    );
  }
};

/**
 * Creates an instances of Trigger with specified config
 */
export class FTrigger {
  private config: Types.AppConfig;

  public constructor(config: Types.AppConfig) {
    this.config = config;
  }

  /**
   * Deletes a trigger of given uuid
   * @param uuid 
   */
  public async delete(uuid: string) {
    return CommonUtils.callBetterTouchTool(
      'delete_trigger',
      { uuid },
      this.config,
      false,
    );
  };

  /**
   * Creates a new trigger
   * @param config 
   */
  public async create(config: Types.TriggerConfig): Promise<Trigger> {
    await CommonUtils.callBetterTouchTool(
      'add_new_trigger',
      {
        json: config,
      },
      this.config,
      false,
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
  public get(config: Types.TriggerConfig): Trigger {
    return new Trigger(this.config, config);
  }

  /**
   * Triggers an action / trigger of specified json
   */
  public async invoke(json: Types.BttPayload) {
    return CommonUtils.callBetterTouchTool(
      'trigger_action',
      {
        json,
      },
      this.config,
    );
  }
}