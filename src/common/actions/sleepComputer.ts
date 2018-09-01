import * as Types from '../../../types';
import { Action } from '../action';

/**
 * This action is responsible for sleeping the mac
 */
export default class ASleepComputer extends Action { 
  protected id: number = Types.ACTION.SLEEP_COMPUTER;
}