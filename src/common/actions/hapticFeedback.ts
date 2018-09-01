import * as Types from '../../../types';
import { Action } from '../../common/action';

/**
 * This action is responsible for sending a haptic feedback to built in trackpad
 */
export default class AHapticFeedback extends Action { 
  protected id: number = Types.ACTION.TRIGGER_HAPTIC_ENGINE;
  
  /**
   * Returns a json of the current action. 
   * url and invoke properties of this class depend on this
   */
  public get data(): any {
    const hapticMode: number = this.arguments[0];
    
    return {
      "BTTHapticFeedbackAction" : hapticMode,
    };
  }
}