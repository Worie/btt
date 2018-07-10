import * as Types from '../../../types';
import { Action } from '../../common/action';

/**
 * This action is responsible for locking the screen of your Mac
 */
export default class ALockScreen extends Action { 
  // reference name
  public static alias: string = 'lockScreen';

  /**
   * Returns a json of the current action. 
   * url and invoke properties of this class depend on this
   */
  public get json(): any {
    return {
      "BTTPredefinedActionType" : Types.ACTION.LOCK_SCREEN,
      "BTTEnabled2" : 1,
      "BTTEnabled" : 1,
    };
  }
}