import * as Types from "../../types";
import * as CommonUtils from '../common/util';
import * as Url from 'url';

/**
 *  Basic structure and methods for all Actions
 *  Every action implementation derives from this class, should not be called directly
 */
export abstract class Action {
  protected config: Types.IBTTConfig;
  protected arguments: any[] = [];
  
  public static alias: string = '';
  
  /**
   * A constructor for abstract Action class
   * @param args 
   */
  public constructor(
    config: Types.IBTTConfig,
    ...args: any[]
  ) {
    this.config = config;
    this.arguments = args;
  }
  
  /**
   * Returns the url of the given action, that this library generates
   */
  public get url(): string {
    let url: string = Url.resolve(
      CommonUtils.getUrl(this.config),
      'trigger_action/',
    );

    url = Url.resolve(url, `?${this.params}`);
    return url;
  }

  /**
   * Returns JSON structure for the current action. 
   * Must be overriden by instances
   */
  public get json(): any {
    return;
  }

  /**
   * Calls the prepared actions
   */
  public async invoke(): Promise<any> {
    return CommonUtils.makeAction(
      'trigger_action', 
      { json: JSON.stringify(this.json) },
      this.config
    );
  }
  
  /**
   * Returns parameters needed for url generation
   */
  protected get params(): string {
    return CommonUtils.params({
      json: JSON.stringify(this.json),
    }, this.config.sharedKey);
  }
}
