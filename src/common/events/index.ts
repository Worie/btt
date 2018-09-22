import CommonUtils from '../util';
import EventTriggers from './/triggers';
import { BaseAction } from '../../abstract/base-action';
import AExecuteScript from '../actions/executeScript';
import { EActions, EventCategory } from '../../types/enum';
import * as Keys from '../keys';
import * as Types from '../../types/types';
import EventPayloadTemplate from './payload';
import * as _ from 'lodash';

/**
 * @TODO: Clean up addTriggerAction
 */

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
  private namespace: string = CommonUtils.namespace;

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
   * @param cb IEventParameter
   */
  public addTriggerAction(eventType: string, cb: (e: Types.IEventParameter) => any): void {
    const jsonUUID: string = this.generateUUID(...arguments);

    const actions: BaseAction[] = [];
    let comment: string = '';

    const event: Types.IEventParameter = {
      actions,
      comment,
      requiredModifierKeys: [],
      additionalJSON: {},
      config: {},
    };

    cb(event);

    // handle required modifier keys (for 'trackpad', mouse related and 'other' categories )
    // @TODO: use requiredModifierKeys, map them, use KEYS module to calculate the BTTRequiredModifierKeys mask (or value?)

    // build a base JSON that'll contain a list of actions that should be triggered
    // upon detection of given eventType
    const batchAction: any = this.buildActionSequence(event.actions);

    const listenerJSON: any = this.buildTriggerAction(
      eventType, 
      batchAction,
      { comment: event.comment }
    );
    
    _.merge(listenerJSON, event.config, event.additionalJSON);
  
    listenerJSON.UUID = jsonUUID;
    listenerJSON.AdditionalActions = listenerJSON.AdditionalActions.map((action: any) => {
      return _.merge(action, {
        UUID: CommonUtils.generateUuidForString(JSON.stringify(action), jsonUUID),
      });
    });

    // and set up ids
    CommonUtils.makeAction('add_new_trigger', {
      json: _.cloneDeep(listenerJSON),
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
        (ev: Types.IEventParameter): any => {
          const actions = [
            this.executeScript(code),
          ];
          
          ev.actions.push(...actions);
          ev.additionalJSON = { UUID: triggerID };
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
  private getTriggerClassProperty(category: EventCategory): string {
    // we're returning the value of the json property that'll be dispatched to BTT
    // so we must use full "BTTTriggerType*" instead TriggerType*
    switch (category) {
      case EventCategory.TRACKPAD: { return "BTTTriggerTypeTouchpadAll"; }
      case EventCategory.OTHER_MOUSE: { return "BTTTriggerTypeNormalMouse"; }
      case EventCategory.MAGIC_MOUSE: { return "BTTTriggerTypeMagicMouse"; }
      case EventCategory.SIRI_REMOTE: { return "BTTTriggerTypeSiriRemote"; }
      case EventCategory.OTHER: { return "BTTTriggerTypeOtherTriggers"; }
      case EventCategory.KEY_COMBO: { return "BTTTriggerTypeKeyboardShortcut"; }
    }

    return null;
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
          Order: index, 
          GestureNotes: this.defaultComment, // reconsider where to put that
        };
      });

    return {
      PredefinedActionType: EActions.NO_ACTION,
      Enabled2: 1,
      Enabled: 1,
      AdditionalActions: jsons,
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
    const eventTriggerObject: Types.IEventTrigger = EventTriggers.getByName(eventName);

    if (typeof eventTriggerObject === 'undefined') {
      throw new Error(`Trying to use an event that does not exist, nor is a shortcut: ${eventName}`)
    }

    const json: any = {
      TriggerType: eventTriggerObject.id,
      TriggerClass: this.getTriggerClassProperty(eventTriggerObject.category),
      Order: 99999,
      GestureNotes: options.comment || this.defaultComment,
      ...batchAction,
    };

    // if user requested a key combo trigger, some additional fields are necessary
    if (eventTriggerObject.category === EventCategory.KEY_COMBO) {
      Object.assign(json, {
        ShortcutModifierKeys: Keys.createBitmaskForShortcut(eventName, false),
        AdditionalConfiguration: String(Keys.createBitmaskForShortcut(eventName, true)),
        ShortcutKeyCode: Keys.getKeyCode(eventName.split('+').pop())
      });

      // in case user has explicitly said that modifiers location matters, 
      // enable differentation
      if (Keys.isDifferentiating(eventName)) {
        Object.assign(json, {
          TriggerConfig: {
            LeftRightModifierDifferentiation: 1,
          },
        });
      }
    }

    return json;
  }
}