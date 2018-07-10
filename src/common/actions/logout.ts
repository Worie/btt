import * as Types from '../../../types';
import { Action } from '../../common/action';

/**
 * This action is responsible for logging out the current user
 */
export default class ALogout extends Action { 
  // reference name
  public static alias: string = 'logout';

  /**
   * Returns a json of the current action. 
   * url and invoke properties of this class depend on this
   */
  public get json(): any {
    return {
      "BTTPredefinedActionType" : Types.ACTION.LOGOUT,
      "BTTEnabled2" : 1,
      "BTTEnabled" : 1,
    };
  }
}