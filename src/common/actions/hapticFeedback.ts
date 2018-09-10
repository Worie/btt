import { EActions } from 'types/enum';
import { BaseAction } from 'common/action';

/**
 * This action is responsible for sending a haptic feedback to built in trackpad
 */
export default class AHapticFeedback extends BaseAction { 
  protected id: EActions = EActions.TRIGGER_HAPTIC_ENGINE;
  
  public get data(): any {
    const hapticMode: number = this.arguments[0];
    
    return {
      "BTTHapticFeedbackAction" : hapticMode,
    };
  }
}