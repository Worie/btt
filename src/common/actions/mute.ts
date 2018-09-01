import * as Types from '../../../types';
import { Action } from '../action';

/**
 * This action is responsible for toggling the mute state of your Mac
 */
export default class AMute extends Action { 
  protected id: number = Types.ACTION.MUTE;
}