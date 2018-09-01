import * as Types from '../../../types';
import { Action } from '../action';

/**
 * This action is responsible for toggling cursor visibility
 */
export default class AToggleMouseCursor extends Action { 
  protected id: number = Types.ACTION.TOGGLE_MOUSE_CURSOR;
}