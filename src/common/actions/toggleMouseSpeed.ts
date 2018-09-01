import * as Types from '../../../types';
import { Action } from '../action';

/**
 * This action is responsible for toggling between fast and regular mouse speed
 */
export default class AToggleMouseSpeed extends Action { 
  protected id: number = Types.ACTION.TOGGLE_MOUSE_SPEED;
}
