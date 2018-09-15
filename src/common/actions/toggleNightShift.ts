import { EActions } from '../../types/enum';
import { BaseAction } from '../action';

/**
 * This action is responsible for toggling night shift
 */
export default class AToggleNightShift extends BaseAction { 
  protected id: EActions = EActions.TOGGLE_NIGHT_SHIFT;
}
