import * as DetectNode from 'detect-node';
import * as Types from '../types/types';
import * as uuidv5 from 'uuid/v5';

// @TODO: Clean up utils - this is the most messy place atm
// @TODO: abstract util class -> all methods defined there

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
 * Maps each key in the passed object to btt notation (BTTWhateverPassed)
 * @TODO: Whole package should use simplified naming, and then just do it once
 * @param key 
 */
export function translateObjectKeysToBttNotation(object: Record<string,any>) {
  Object.keys(object).forEach(key => {
    if (typeof object[key] === 'object') {
      translateObjectKeysToBttNotation(object[key]);
    }
    object[keyToBttNotation(key)] = object[key];
    delete object[key];
  });

  return object;
}

/**
 * Maps given string to btt JSON key notation
 * @example 'triggerName' => 'BTTTriggerName'
 * @param key 
 */
export function keyToBttNotation(key: string) {
  if (key.indexOf('BTT') === 0) {
    return key;
  }
  return `BTT${key[0].toUpperCase()}${key.substring(1)}`;
}

/**
 * 
 * @param string 
 */
export function simpleCase(string: string) {
  return string
    .replace(/-/g, '')
    .replace(/_/g, '')
    .toLocaleLowerCase();
}