import * as Types from '../../../types';
import { Action } from '../action';

/**
 * This action is responsible for toggling between big and regular mouse cursor
 */
export default class AToggleMouseSize extends Action { 
  protected id: number = Types.ACTION.TOGGLE_MOUSE_SIZE;
}