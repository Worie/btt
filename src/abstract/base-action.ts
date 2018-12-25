import CommonUtils from '../common/util';
import * as Url from 'url';
import { EActions } from '../types/enum';
import * as Types from '../types/types';

/**
 * Basic structure and methods for all Actions
 * Every action implementation derives from this class, should not be called directly
 */
export abstract class BaseAction {
  protected config: Types.AppConfig;
  protected arguments: any[] = [];
  protected id: EActions;
  
  /**
   * A constructor for the Action
   * @param args 
   */
  public constructor(
    config: Types.AppConfig,
    ...args: any[]
  ) {
    this.config = config;
    this.arguments = args;
  }

  /**
   * Returns JSON structure for the current action. 
   * Must be overriden by instances
   */
  public get json(): Types.BttPayload {
    return CommonUtils.translateObjectKeysToBttNotation({
      ...this.baseData,
      ...this.data,
    });
  }
  
  /**
   * Intended to be overriden by action implementation
   * If left as is, simply uses the id of the action and produces required json
   */
  protected get data(): Partial<Types.BttPayload> {
    return this.baseData;
  }
  
  /**
   * Returns the base data of every JSON, required for BTT to see the changes
   */
  private get baseData(): Partial<Types.BttPayload> {
    return {
      PredefinedActionType : this.id,
      Enabled2 : 1,
      Enabled : 1,
    }
  };
  
  /**
   * Returns the url of the given action, that this library generates
   * Visiting the returned value in browser (or calling it from backend) will
   * invoke this particular action on the mac specified in initial configuration
   */
  public get url(): string {
    let url: string = Url.resolve(
      CommonUtils.getBaseUrl(this.config),
      'trigger_action/',
    );

    url = Url.resolve(url, `?${this.params}`);
    return url;
  }

  /**
   * Calls the prepared action
   */
  public async invoke(): Promise<Types.CallResult | any> {
    if (this.id === EActions.DUMMY) {
      return new Promise((res, rej) => { 
        const response = ({
          time: null,
          note: `This action was was not performed due to blacklisting: ${(this as any).name}`,
          status: null,
        }) as Types.CallResult;
        res(response); 
      });
    }

    return CommonUtils.callBetterTouchTool(
      'trigger_action', 
      { json: this.json },
      this.config,
      true
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
