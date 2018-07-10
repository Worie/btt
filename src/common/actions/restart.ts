import * as Types from '../../../types';
import { Action } from '../../common/action';

/**
 * This action is responsible for restarting BTT
 */
export default class ARestartBTT extends Action { 
  // reference name
  public static alias: string = 'restart';

  /**
   * Returns a json of the current action. 
   * url and invoke properties of this class depend on this
   */
  public get json(): any {
    return {
      "BTTPredefinedActionType" : Types.ACTION.RESTART_BTT,
      "BTTEnabled2" : 1,
      "BTTEnabled" : 1,
    };
  }
}
