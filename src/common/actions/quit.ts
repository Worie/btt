import * as Types from '../../../types';
import { Action } from '../action';

/**
 * This action is responsible for quitting the BetterTouchTool completely
 */
export default class AQuitBTT extends Action {
  protected id: number = Types.ACTION.QUIT_BTT;
}