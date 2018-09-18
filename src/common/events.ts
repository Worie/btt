import * as CommonUtils from './util';
import { BaseAction } from './action';
import AExecuteScript from './actions/executeScript';
import * as Types from '../types/types';

/**
 * This class holds methods related to the wide term "events"
 * 
 * This includes creating a simple action in BetterTouchTool, as well as 
 * creating advanced event listeners which are going to be evaluated on btt-node-server side
 */
export default class EventManager {
  // holds btt instance config
  private config: Types.IBTTConfig;

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
  public addTriggerAction(eventType: string, cb: (e: Types.IEventCallback) => any, options?: any): void {
    const actions: BaseAction[] = [];
    let comment: string = '';

    const event: Types.IEventCallback = {
      actions,
      comment,
      additionalJSON: {},
    };

    cb(event);

    // do something with those actions and eventType and the event that we got
    const batchAction: any = CommonUtils.buildActionSequence(event.actions);

    const listenerJSON: any = CommonUtils.buildTriggerAction(eventType, batchAction, {
      comment: event.comment,
    }); 

    const additionalJSON = this.translateObjectKeysToBttNotation(event.additionalJSON);

    Object.assign(listenerJSON, additionalJSON);

    // set up ids
    const listenerUuid: string = CommonUtils.generateUuidForString(
      `${eventType}:${String(cb)}`,
      this.namespace
    );

    listenerJSON['BTTUUID'] = listenerUuid;
    listenerJSON['BTTAdditionalActions'] = listenerJSON['BTTAdditionalActions'].map((action: any) => {
      return {
        ...action,
        "BTTUUID": CommonUtils.generateUuidForString(JSON.stringify(action), listenerUuid),
      };
    });

    // end set up ids

    CommonUtils.makeAction('add_new_trigger', {
      json: JSON.stringify({
        ...listenerJSON,
        ...options,
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
    // @TODO: create private method here and reuse it 
    const triggerID: string = CommonUtils.generateUuidForString(
      `${eventType}:${String(cb)}`,
      this.namespace
    );
  
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

    const data = CommonUtils.generatePayload(this.config, cb);

    const triggerID: string = CommonUtils.generateUuidForString(
      `${eventType}:${data}}`,
      this.namespace
    );

    const { port, domain } = this.config.eventServer;

    // add script
    // @TODO: move to separate file and require it here
    const code = `
      const http = require('http');
      
      const postData = JSON.stringify(${data});
    
      const options = {
        hostname: '${domain}',
        port: ${port},
        path: '/dynamic',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      };
      
      const req = http.request(options, (res) => {
        res.setEncoding('utf8');
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          console.log(data);
        });
      });
      
      req.write(postData);
      req.end();`;

      // register a trigger in BetterTouchTool that'll make a request to the btt-node-server
      this.addTriggerAction(
        eventType, 
        (ev: Types.IEventCallback): any => {
          const actions = [
            this.executeScript(code),
          ];
          
          ev.actions.push(...actions);
        },
        { 'BTTUUID': triggerID }, // @TODO: find a better way to do this, perhaps JSON utilitiy function
      );
  };
  
  /**
   * Removes the trigger that'd make a specific request to the btt-node-server
   * 
   * @param eventType event that'd trigger the action
   * @param cb callback that you want to take off from the event
   */
  public removeEventListener(eventType: string, cb: (e: any) => {}): void {
    const data = CommonUtils.generatePayload(this.config, cb);

    // get the id from event type, callback and everything
    const triggerID: string = CommonUtils.generateUuidForString(
      `${eventType}:${data}}`,
      this.namespace,
    );
  
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
   * Maps each key in the passed object to btt notation (BTTWhateverPassed)
   * @TODO: move those to util and reuse everywhere. Whole package should use simplified naming,
   * and then just do it once
   * @param key 
   */
  private translateObjectKeysToBttNotation(object: Record<string,any>) {
    Object.keys(object).forEach(key => {
      if (typeof object[key] === 'object') {
        this.translateObjectKeysToBttNotation(object[key]);
      }
      object[this.keyToBttNotation(key)] = object[key];
      delete object[key];
    });

    return object;
  }
  
  /**
   * Maps given string to btt JSON key notation
   * @example 'triggerName' => 'BTTTriggerName'
   * @param key 
   */
  private keyToBttNotation(key: string) {
    if (key.indexOf('BTT') === 0) {
      return key;
    }
    return `BTT${key[0].toUpperCase()}${key.substring(1)}`;
  }
}