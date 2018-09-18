import { EActions } from '../../types/enum';
import { BaseAction } from '../action';

/**
 * This action is responsible for sending a haptic feedback to built in trackpad
 */
export default class AHapticFeedback extends BaseAction { 
  protected id: EActions = EActions.TRIGGER_HAPTIC_ENGINE;
  
  public get data() {
    const hapticMode: number = this.arguments[0];
    
    return {
      HapticFeedbackAction : hapticMode,
    };
  }
}