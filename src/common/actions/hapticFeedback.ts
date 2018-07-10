import * as Types from '../../../types';
import { Action } from '../../common/action';

/**
 * This action is responsible for sending a haptic feedback to built in trackpad
 */
export default class AHapticFeedback extends Action { 
  // reference name
  public static alias: string = 'hapticFeedback';

  /**
   * Returns a json of the current action. 
   * url and invoke properties of this class depend on this
   */
  public get json(): any {
    const hapticMode: number = this.arguments[0];
    
    return {
      "BTTPredefinedActionType" : Types.ACTION.TRIGGER_HAPTIC_ENGINE,
      "BTTHapticFeedbackAction" : hapticMode,
      "BTTEnabled2" : 1,
      "BTTEnabled" : 1,
    };
  }
}