import CommonUtils from './util';
import * as Types from '../types/types';
import { BttPayload, BTTEndpoint } from '../types/types';

export class Trigger {
  // holds the uuid of the newly created / initialized trigger
  public uuid: string;
  
  // holds the name of the newly created / initialized trigger
  private name: string;

  // holds the config of the current instance
  private config: Types.AppConfig;
  
  /**
   * Constructs the Trigger instance, sets the uuid and name for further calls
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
  public async invoke(): Promise<Types.CallResult> {
    // if this is a named trigger
    if (this.name) {
      // perform a named trigger execution
      return this.callBTTWithContext(BTTEndpoint.TRIGGER_NAMED_INVOKE, { trigger_name: this.name });
      
    // if this was a generic trigger
    } else if (this.uuid) {
      // executre the actions for this trigger
      return this.callBTTWithContext(BTTEndpoint.TRIGGER_INVOKE, { uuid: this.uuid });
    }
  }

  /**
   * Updates the trigger data with given JSON
   */
  public async update(json: Types.BttPayload): Promise<Types.CallResult> {
    if (!json) {
      console.warn('No update data passed to Trigger');
      return;
    }

    // update the trigger with given json
    return this.callBTTWithContext(BTTEndpoint.TRIGGER_UPDATE, { json, uuid: this.uuid });
  }

  /**
   * Removes current trigger
   */
  public async delete() {
    return this.callBTTWithContext(BTTEndpoint.TRIGGER_DELETE, { uuid: this.uuid });
  }

  /**
   * Calls BTT with given payload using widget context
   * @TODO may be made reusable
   * @param mode 
   * @param payload 
   */
  private callBTTWithContext(
    mode: string, 
    payload: BttPayload,
  ): Promise<Types.CallResult> {
    return CommonUtils.callBetterTouchTool(mode, payload, this.config, false);
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
    return this.callBTTWithContext(BTTEndpoint.TRIGGER_DELETE, { uuid });
  };

  /**
   * Creates a new trigger
   * @param config 
   */
  public async create(json: Types.TriggerConfig): Promise<Trigger> {
    // create a widget in BTT
    await this.callBTTWithContext(BTTEndpoint.TRIGGER_CREATE, { json });

    // return ready to use Trigger instance
    return new Trigger(this.config, json);
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
    return this.callBTTWithContext(BTTEndpoint.TRIGGER_JSON, { json });
  }

  /**
   * Calls BTT with given payload using widget context
   * @TODO may be made reusable
   * @param mode 
   * @param payload 
   */
  private callBTTWithContext(
    mode: string, 
    payload: BttPayload,
  ): Promise<Types.CallResult> {
    return CommonUtils.callBetterTouchTool(mode, payload, this.config, false);
  }
}