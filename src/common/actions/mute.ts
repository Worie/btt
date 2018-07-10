import * as Types from '../../../types';
import { Action } from '../../common/action';

/**
 * This action is responsible for toggling the mute state of your Mac
 */
export default class AMute extends Action { 
  // reference name
  public static alias: string = 'mute';

  /**
   * Returns a json of the current action. 
   * url and invoke properties of this class depend on this
   */
  public get json(): any {
    return {
      "BTTPredefinedActionType" : Types.ACTION.MUTE,
      "BTTEnabled2" : 1,
      "BTTEnabled" : 1,
    };
  }
}