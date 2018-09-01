import * as Types from '../../../types';
import { Action } from '../action';

/**
 * This action is responsible for sleeping the display
 */
export default class ASleepDisplay extends Action { 
  protected id: number = Types.ACTION.SLEEP_DISPLAY;
}