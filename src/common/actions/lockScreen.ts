import * as Types from '../../../types';
import { Action } from '../action';

/**
 * This action is responsible for locking the screen of your Mac
 */
export default class ALockScreen extends Action { 
  protected id: number = Types.ACTION.LOCK_SCREEN;
}