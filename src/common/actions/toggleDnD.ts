import * as Types from '../../../types';
import { Action } from '../action';

/**
 * This action is responsible for toggling do not disturb mode on target Mac
 */
export default class AToggleDnD extends Action { 
  protected id: number = Types.ACTION.TOGGLE_DND; 
}