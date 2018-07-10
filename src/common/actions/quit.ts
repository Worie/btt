import * as Types from '../../../types';
import { Action } from '../../common/action';

/**
 * This action is responsible for quitting the BetterTouchTool completely
 */
export default class AQuitBTT extends Action { 
  // reference name
  public static alias: string = 'quit';

  /**
   * Returns a json of the current action. 
   * url and invoke properties of this class depend on this
   */
  public get json(): any {
    return {
      "BTTPredefinedActionType" : Types.ACTION.QUIT_BTT,
      "BTTEnabled2" : 1,
      "BTTEnabled" : 1,
    };
  }
}