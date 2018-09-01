import * as Types from '../../../types';
import { Action } from '../action';

/**
 * This action is responsible for starting siri
 */
export default class AStartSiri extends Action { 
  protected id: number = Types.ACTION.START_SIRI;
}