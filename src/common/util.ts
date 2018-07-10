import * as DetectNode from 'detect-node';
import * as Types from '../../types';
import * as CamelCase from 'camelcase';
import * as uuidv5 from 'uuid/v5';

let fetch: any;
let deleteTriggerFn: any; // could be "method" = 'webserver' | 'url scheme'

if (DetectNode) {
  fetch = require('node-fetch-polyfill');
  deleteTriggerFn = require('../backend/util').deleteTrigger;
} else {
  fetch = window.fetch;
  deleteTriggerFn = require('../frontend/util').deleteTrigger;
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
export function makeAction(
  action: string, 
  data: Record<string, any>,
  config: Types.IBTTConfig,
): Promise<any> {
  try {
    const parameters = params(data, config.sharedKey);
    const url = getUrl(config);
    const urlToFetch = buildFullUrl(action, parameters, url);
    
    return fetch(urlToFetch);
  } catch (error) {
    console.error(error);
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
        "BTTGestureNotes" : 'Trigger created using JS package "btt"', // reconsider where to put that
      };
    });

  return {
    "BTTPredefinedActionType" : Types.ACTION.NO_ACTION,
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

  if (typeof triggerType === 'undefined') {
    return;
  }

  const json: any = {
    "BTTTriggerType": triggerType,
    "BTTTriggerClass" : getTriggerClassProperty(triggerType), // @TODO
    "BTTOrder": 99999,
    "BTTGestureNotes" : options.comment || 'Trigger created using JS package "BTT"',
    ...batchAction,
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
    Types.TRACKPAD_TRIGGERS,
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
function getTriggerClassProperty(value: number): string {
  if (value in Types.TRACKPAD_TRIGGERS) {
    return "BTTTriggerTypeTouchpadAll";
  }
  //  else if (value in Types.KEYBOARD_TRIGGERS) {
  //   return "BTTTriggerTypeKeyboardShortcut";
  // } else if (value in Types.MOUSE_TRIGGERS) {
  //   return "BTTTriggerTypeMagicMouse";
  // }
}

/**
 * Takes a namespace as a parameter and a text, to generate an UUID (uuidv5)
 * @param text 
 * @param namespace 
 */
export function generateUuidForString(text: string, namespace: string): string {
  return uuidv5(String(text), namespace);
}