import * as CommonUtils from '../util';
import { BaseAction } from '../action';
import AExecuteScript from '../actions/executeScript';
import { EActions, ETrackpadTriggers, EMouseTriggers, ESiriRemoteTriggers, EOtherTriggers, EMagicMouseTriggers } from '../../types/enum';
import * as Keys from '../keys';
import * as Types from '../../types/types';
import EventPayloadTemplate from './payload';

/**
 * This class holds methods related to the wide term "events"
 * 
 * This includes creating a simple action in BetterTouchTool, as well as 
 * creating advanced event listeners which are going to be evaluated on btt-node-server side
 */
export default class EventManager {
  // holds btt instance config
  private config: Types.IBTTConfig;

  private defaultComment = 'Created via https://github.com/Worie/btt';

  // namespace for uuid/v5
  private namespace: string = CommonUtils.getNamespace();

  /**
   * Initializes the event manager with specific btt config
   * @param config 
   */
  constructor(config: Types.IBTTConfig) {
    this.config = config;
  }

  /**
   * Adds event listener to BTT. Keep in mind this is persistent, so if you call this method twice, 
   * two entries will be added to BTT. Closing the browser / node process won't make the listeners die
   * 
   * @param eventType string, created from action enum identifier
   * @param cb IEventCallback
   */
  public addTriggerAction(eventType: string, cb: (e: Types.IEventCallback) => any): void {
    const jsonUUID: string = this.generateUUID(...arguments);

    const actions: BaseAction[] = [];
    let comment: string = '';

    const event: Types.IEventCallback = {
      actions,
      comment,
      additionalJSON: {},
    };

    cb(event);

    // do something with those actions and eventType and the event that we got
    const batchAction: any = this.buildActionSequence(event.actions);

    const listenerJSON: any = this.buildTriggerAction(
      eventType, 
      batchAction,
      { comment: event.comment }
    ); 

    const additionalJSON = CommonUtils.translateObjectKeysToBttNotation(event.additionalJSON);

    Object.assign(listenerJSON, additionalJSON);

    listenerJSON['BTTUUID'] = jsonUUID;
    listenerJSON['BTTAdditionalActions'] = listenerJSON['BTTAdditionalActions'].map((action: any) => {
      return {
        ...action,
        "BTTUUID": CommonUtils.generateUuidForString(JSON.stringify(action), jsonUUID),
      };
    });

    // end set up ids

    CommonUtils.makeAction('add_new_trigger', {
      json: JSON.stringify({
        ...listenerJSON,
      })
    }, this.config);
  }


  /**
   * Removes event listener
   * 
   * @param eventType string, created from action enum identifier
   * @param cb IEventCallback
   */
  public removeTriggerAction(eventType: string, cb: (e: any) => any): void {    
    // get the id from event type, callback and everything
    const triggerID: string = this.generateUUID(...arguments);
  
    CommonUtils.deleteTrigger(triggerID);
  }

  /**
   * 
   * @param eventType 
   * @param cb 
   */
  public addEventListener(eventType: string, cb: (e: any) => any): void {
    if (!this.config.eventServer) {
      console.warn('You must provide event server URL to use this feature');
      return;
    }

    const data = this.generatePayload(this.config, cb);

    const triggerID: string = this.generateUUID(eventType, data);

    const { port, domain } = this.config.eventServer;

    // add script
    const code = EventPayloadTemplate({data, domain, port});

      // register a trigger in BetterTouchTool that'll make a request to the btt-node-server
      this.addTriggerAction(
        eventType, 
        (ev: Types.IEventCallback): any => {
          const actions = [
            this.executeScript(code),
          ];
          
          ev.actions.push(...actions);
          ev.additionalJSON = { 'BTTUUID': triggerID };
        },
      );
  };
  
  /**
   * Removes the trigger that'd make a specific request to the btt-node-server
   * 
   * @param eventType event that'd trigger the action
   * @param cb callback that you want to take off from the event
   */
  public removeEventListener(eventType: string, cb: (e: any) => {}): void {
    const data = this.generatePayload(this.config, cb);

    // get the id from event type, callback and everything
    const triggerID: string = this.generateUUID(eventType, data);
  
    // remove the specific trigger
    CommonUtils.deleteTrigger(triggerID);
  };

  /**
   * Runs the code in the current btt instance
   * @param code code to be run
   */
  private executeScript(code: string): BaseAction {
    return new AExecuteScript(this.config, code);
  }

  /**
   * Generates uuid for specific event / action trigger
   * @param args 
   */
  private generateUUID(...args: any[]) {
    return CommonUtils.generateUuidForString(
      args.map(a => String(a)).join(':'),
      this.namespace,
    );
  }

  /**
   * Generates a payload, later interpreted by btt-node-server
   * 
   * @param bttConfig config of certain btt instance
   * @param callback function to invoke
   */
  private generatePayload(
    bttConfig: Types.IBTTConfig,
    callback: Function
  ): string{
    // create a payload object out of given params
    const payload: string = JSON.stringify({
      bttConfig: JSON.stringify(bttConfig),
      cb: callback.toString(),
    });

    // holds base64 representation of the payload
    const base64Payload: string = Buffer.from(payload).toString('base64');

    // creates a data that is ready to use in POST request
    const data = {
      payload: base64Payload,
    };
    
    return JSON.stringify(data);
  };


  /**
   * Returns the trigger class proprerty, required for trigger actions to work
   * 
   * @param value 
   */
  private getTriggerClassProperty(value: number | string): string {
    if (value in ETrackpadTriggers) {
      return "BTTTriggerTypeTouchpadAll";
    } else if (value in EMouseTriggers) {
      return "BTTTriggerTypeNormalMouse";
    } else if (value in EMagicMouseTriggers) {
      return "BTTTriggerTypeMagicMouse";
    } else if (value in ESiriRemoteTriggers) {
      return "BTTTriggerTypeSiriRemote";
    } else if (value in EOtherTriggers) {
      return "BTTTriggerTypeOtherTriggers";
    } else if (Keys.isValidShortcut(value as string)) {
      return "BTTTriggerTypeKeyboardShortcut";
    }
  }

  /**
   * Builds a JSON out of given array of action objects
   * 
   * @param actions 
   */
  private buildActionSequence(actions: any[]): any {
    const jsons: any = actions
      .map(action => action.json)
      .map((action, index) => {
        return {
          ...action,
          "BTTOrder": index, 
          "BTTGestureNotes" : this.defaultComment, // reconsider where to put that
        };
      });

    return {
      "BTTPredefinedActionType" : EActions.NO_ACTION,
      "BTTEnabled2" : 1,
      "BTTEnabled" : 1,
      "BTTAdditionalActions": jsons,
    }
  }

  /**
   * Builds trigger action, that can be added to BTT (event listener like)
   * 
   * @param eventName 
   * @param batchAction 
   * @param options 
   */
  private buildTriggerAction(eventName: string, batchAction: any, options: any = {}) { 
    const triggerType: number = this.getTriggerIdByEventName(eventName);
    const isValidShorcut: boolean = Keys.isValidShortcut(eventName);

    if (typeof triggerType === 'undefined' && !isValidShorcut) {
      throw new Error(`Trying to use an event that does not exist, nor is a shortcut: ${eventName}`)
    }

    const json: any = {
      "BTTTriggerType": triggerType,
      "BTTTriggerClass" : this.getTriggerClassProperty(triggerType || eventName),
      "BTTOrder": 99999,
      "BTTGestureNotes" : options.comment || this.defaultComment,
      ...batchAction,
    };

    if (isValidShorcut) {

      Object.assign(json, {
        "BTTShortcutModifierKeys" : Keys.createBitmaskForShortcut(eventName, false),
        "BTTAdditionalConfiguration" : String(Keys.createBitmaskForShortcut(eventName, true)),
        "BTTShortcutKeyCode": Keys.getKeyCode(eventName.split('+').pop())
      });

      if (Keys.isDifferentiating(eventName)) {
        Object.assign(json, {
          "BTTTriggerConfig" : {
            "BTTLeftRightModifierDifferentiation" : 1
          }
        });
      }

      return json;
    }

    return json;
  }

  /**
   * Helper function for getting the real BTT-understandable integer
   * 
   * @param eventName eventName
   */
  private getTriggerIdByEventName(eventName: string): number {
    const triggerMap = this.getTriggerMap();
    
    const TRIGGER_KEY: number = (
      triggerMap.get(eventName.toLowerCase())
    );

    if (TRIGGER_KEY) {
      return TRIGGER_KEY;
    }

    return;
  }

  /**
   * Returns a map containing all values of Trigger related enums
   */
  private getTriggerMap(): Map<string, number> {
    const triggerMap: Map<string, number> = new Map();

    const triggerEnums: any[] = [
      ETrackpadTriggers,
      ESiriRemoteTriggers,
      EOtherTriggers,
      EMagicMouseTriggers,
      EMouseTriggers,
    ];

    triggerEnums.forEach((e: any) => {
      // filters the keys only to string representations
      const keys: string[] = Object.keys(e)
        .filter((key: string) => Number.isNaN(Number.parseInt(key)));
      
      // for each key in map, create an entry
      keys.forEach(key => {
        triggerMap.set(key, e[key]);
        triggerMap.set(CommonUtils.simpleCase(key), e[key]);
      });
    });
    
    return triggerMap;
  }
}