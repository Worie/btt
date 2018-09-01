import * as Types from '../../../types';
import { Action } from '../action';

/**
 * This action is responsible for toggling night shift
 */
export default class AToggleNightShift extends Action { 
  protected id: number = Types.ACTION.TOGGLE_NIGHT_SHIFT;
}
