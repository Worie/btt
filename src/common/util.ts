import * as DetectNode from 'detect-node';
import { EActions, ETrackpadTriggers, EMouseTriggers } from '../types/enum';
import * as CamelCase from 'camelcase';
import * as Types from '../types/types';
import * as uuidv5 from 'uuid/v5';
import * as Keys from '../common/keys';

// @TODO: Clean up utils - this is the most messy place atm

let fetch: any;
let deleteTriggerFn: any; // could be "method" = 'webserver' | 'url scheme'
let getBinaryPath: any;

const NAMESPACE = '87a84aef-11fe-4dce-8d00-429cea46f345';

if (DetectNode) {
  fetch = require('node-fetch-polyfill');
  deleteTriggerFn = require('../backend/util').deleteTrigger;
  getBinaryPath = require('../backend/util').nodeBinaryPath;
} else {
  fetch = window.fetch;
  deleteTriggerFn = require('../frontend/util').deleteTrigger;
  getBinaryPath = (): any => undefined;
}

export function deleteTrigger(uuid: string): void {
  return deleteTriggerFn(uuid);
}

/**
 * Returns a base url for the BTT webserver endpoint
 */
export function getUrl(config: Partial<Types.IBTTConfig>): string {
  const { protocol, domain, port } = config; 
  return `${protocol}://${domain}:${port}/`;
}

/**
 * Sends a request to real BTT built in webserver with given data translated as GET query params
 */
export async function makeAction(
  action: string, 
  data: Record<string, any>,
  config: Types.IBTTConfig,
): Promise<any> {
    const parameters = params(data, config.sharedKey);
    const url = getUrl(config);
    const urlToFetch = buildFullUrl(action, parameters, url);
    
    try {
      const result = await fetch(urlToFetch)  
      return result;
    } catch (err) {
      return new Error(
        `
        Fetch to BetterTouchTool webserver API failed. See the details:
        
        Action: ${action}
        Parameters: ${JSON.stringify(data, null, 2)}
        Url: ${url}
        
        Error message: ${err}`,
      );
    }
}

/**
 * Builds the url that'll trigger desired action
 * @param action 
 * @param params 
 * @param baseUrl 
 */
export function buildFullUrl(
  action: string, 
  params: string,
  baseUrl: string
): string {
  return `${baseUrl}${action}/?${params}`;
}

/**
 * Parses given list of params (key-value object) and converts it 
 * to query parameters
 */
export function params(data: Record<string, string>, sharedKey?: string): string {
  // parses keys of the object into query params
  const params = Object.keys(data).map(param => {
    return `${param}=${encodeURIComponent(data[param])}`;
  }).join('&');

  // if sharedKey was passed, add shared_key get parameter to enable the calls
  if (sharedKey) {
    return `${params}&shared_key=${sharedKey}`;
  }
  return params;
}

/**
 * Builds a JSON out of given array of action objects
 * @param actions 
 */
export function buildActionSequence(actions: any[]): any {
  const jsons: any = actions
    .map(action => action.json)
    .map((action, index) => {
      return {
        ...action,
        "BTTOrder": index, 
        "BTTGestureNotes" : 'Created via https://github.com/Worie/btt', // reconsider where to put that
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
 * @param eventName 
 * @param batchAction 
 * @param options 
 */
export function buildTriggerAction(eventName: string, batchAction: any, options: any = {}) { 
  const triggerType: number = getTriggerIdByEventName(eventName);
  const isValidShorcut: boolean = Keys.isValidShortcut(eventName);

  if (typeof triggerType === 'undefined' && !isValidShorcut) {
    throw new Error(`Trying to use an event that does not exist, nor is a shortcut: ${eventName}`)
  }

  const json: any = {
    "BTTTriggerType": triggerType,
    "BTTTriggerClass" : getTriggerClassProperty(triggerType || eventName),
    "BTTOrder": 99999,
    "BTTGestureNotes" : options.comment || 'Trigger created using JS package "BTT"',
    ...batchAction,
  };

  if (isValidShorcut) {

    Object.assign(json, {
      "BTTShortcutModifierKeys" : Keys.createBitmaskForShortcut(eventName, false),
      "BTTAdditionalConfiguration" : String(Keys.createBitmaskForShortcut(eventName, true)),
      "BTTShortcutKeyCode": Keys.getKeyCode(eventName.split('+').pop())
    });

    if(Keys.isDifferentiating(eventName)) {
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
 * @param eventName eventName
 */
function getTriggerIdByEventName(eventName: string): number {
  const TRIGGER_KEY: number = getTriggerMap().get(eventName);

  if (TRIGGER_KEY) {
    return TRIGGER_KEY;
  }
  return;
}

/**
 * Returns a map containing all values of Trigger related enums
 */
function getTriggerMap(): Map<string, number> {
  const triggerMap: Map<string, number> = new Map();

  const triggerEnums: any[] = [
    ETrackpadTriggers,
  ];

  triggerEnums.forEach((e: any) => {
    // filters the keys only to string representations
    const keys: string[] = Object.keys(e).filter((key: string) => Number.isNaN(Number.parseInt(key)));
    
    // for each key in map, create an entry
    keys.forEach(key => {
      triggerMap.set(key, e[key]);
      triggerMap.set(CamelCase(key), e[key]);
    });
  });
  
  return triggerMap;
}

/**
 * Returns the trigger class proprerty, required for trigger actions to work
 * @param value 
 */
function getTriggerClassProperty(value: number | string): string {
  if (value in ETrackpadTriggers) {
    return "BTTTriggerTypeTouchpadAll";
  } else if (value in EMouseTriggers) {
    return "BTTTriggerTypeMagicMouse";
  } else if (Keys.isValidShortcut(value as string)) {
    return "BTTTriggerTypeKeyboardShortcut";
  }
}

/**
 * Takes a namespace as a parameter and a text, to generate an UUID (uuidv5)
 * @param text 
 * @param namespace 
 */
export function generateUuidForString(text: string, namespace: string = NAMESPACE): string {
  return uuidv5(String(text), namespace);
}

/**
 * Returns the current UUID representing the namespace of the package
 */
export function getNamespace(): string {
  return NAMESPACE;
}

/**
 * Returns the path for the current node binary (or undefined on frontend)
 */
export function getNodeBinaryPath(): string {
  return getBinaryPath();
}

/**
 * Generates a payload, later interpreted by btt-node-server
 * @param bttConfig config of certain btt instance
 * @param callback function to invoke
 */
export function generatePayload(
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