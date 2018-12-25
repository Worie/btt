import * as Types from '../types/types';
import * as uuidv5 from 'uuid/v5';
import * as _ from 'lodash';
import { BaseAction } from '../abstract/base-action';

const NAMESPACE = '87a84aef-11fe-4dce-8d00-429cea46f345';

export default abstract class Utilities {
  protected type: 'frontend' | 'backend';

  public abstract deleteTrigger(uuid: string): void;
  
  public abstract fetch(path: string, options?: any): Promise<any>;

  public abstract getNodeBinaryPath(): string;

  public abstract getMdlsName(applicationPath: string): string;

  public abstract performanceNow: any;

  /**
   * Sends a request to real BTT built in webserver with given data translated as GET query params
   */
  public abstract async callBetterTouchTool(
    action: string, 
    data: Types.BttPayload,
    config: Types.AppConfig,
    translate: boolean,
  ): Promise<Types.CallResult>;

  /**
  * Sends a request to real BTT built in webserver with given data translated as GET query params
  */
  protected async callWebserverApi(
    action: string, 
    data: Types.BttPayload,
    config: Types.AppConfig,
    translate: boolean = true,
  ): Promise<Types.CallResult> {
    let parameters = this.params(data, config.sharedKey);
    
    if (translate) {
      const parsedJSON = this.translateObjectKeysToBttNotation(data.json);
      parameters = this.params({json: JSON.stringify(parsedJSON)}, config.sharedKey);
    }

    const url = this.getUrl(config);
    const urlToFetch = this.buildFullUrl(action, parameters, url);

    // start mesuring time
    const startTime = Number(this.performanceNow().toFixed(3)) * 100;
    
    try {
      const response = await this.fetch(urlToFetch);
      // end mesuring time
      const endTime = Number(this.performanceNow().toFixed(3)) * 100;
      return {
        time: (endTime / 100) - (startTime / 100),
        value: response,
        status: response.status,
      };
    } catch (err) {
      return {
        time: null,
        value: err,
        status: err.status,
        note: `
          Request to BetterTouchTool webserver API failed. See the details:
          
          Action: ${action}
          Parameters: ${JSON.stringify(data, null, 2)}
          Url: ${url}
          
          Error message: ${err}`.trim(),
      };
    }
  }

  /** Base, environment agnostic methods */

  /**
   * Returns a base url for the BTT webserver endpoint
   */
  public getUrl(config: Partial<Types.AppConfig>): string {
    const { protocol, domain, port } = config; 

    return `${protocol}://${domain}:${port}/`;
  }

  /**
   * Builds the url that'll trigger desired action
   * @param action 
   * @param params 
   * @param baseUrl 
   */
  public buildFullUrl(
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
  public params(data: Record<string, string>, sharedKey?: string): string {
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
   * Maps each key in the passed object to btt notation (BTTWhateverPassed)
   * @param key 
   */
  public translateObjectKeysToBttNotation(
    object: Partial<Types.AppPayload> | Partial<Types.BttPayload>
  ) {
    if (object === null || !object) {
      return object;
    }
    Object.keys(object).forEach(key => {
      if (typeof object[key] === 'object' && object[key] !== null) {
        if (object[key].length) {
          object[key].forEach((el: any, i: number) => {
            this.translateObjectKeysToBttNotation(object[key][i]);
          });
        } else {
          this.translateObjectKeysToBttNotation(object[key]);
        }
      }

      const newKey: string = this.keyToBttNotation(key);

      if (newKey !== key) {
        object[newKey] = _.cloneDeep(object[key]);
        delete object[key];
      }
    });

    return object;
  }

  /**
   * Maps given string to btt JSON key notation
   * @example 'triggerName' => 'BTTTriggerName'
   * @param key 
   */
  public keyToBttNotation(key: string) {
    if (key.indexOf('BTT') === 0) {
      return key;
    }
    return `BTT${key[0].toUpperCase()}${key.substring(1)}`;
  }

  /**
   * Parses given string to simplified lower case
   * @param string 
   */
  public simpleCase(string: string) {
    return string
      .replace(/-/g, '')
      .replace(/_/g, '')
      .toLocaleLowerCase();
  }

  /**
   * Returns the current UUID representing the namespace of the package
   */
  public get namespace(): string {
    return NAMESPACE;
  }

  /**
   * Returns a base url for the BTT webserver endpoint
   */
  public getBaseUrl(config: Partial<Types.AppConfig>): string {
    const { protocol, domain, port } = config; 
    return `${protocol}://${domain}:${port}/`;
  }

  /**
   * Takes a namespace as a parameter and a text, to generate an UUID (uuidv5)
   * @param text 
   * @param namespace 
   */
  public generateUuidForString(text: string, namespace: string = NAMESPACE): string {
    return uuidv5(String(text), namespace);
  }

  /**
   * Parses given class name to simplified notation
   * @param theClass 
   * @example Class AShowHUD { } => showhud
   */
  public mapClassNameToMethodName(theClass: Types.Class<BaseAction>) {
   if (
     theClass.name[0] !== 'A' &&
     theClass.prototype instanceof BaseAction
   ) {
     throw new Error('Improper action format. This is probably issue caused by developer');
   }
   return theClass.name.substring(1).toLowerCase();
 }
 
}