import * as Types from '../../../types';
import { Action } from '../action';

/**
 * This action is responsible for restarting BTT
 */
export default class ARestartBTT extends Action { 
  protected id: number = Types.ACTION.RESTART_BTT;
}
