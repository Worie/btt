import * as Types from '../../../types';
import { Action } from '../action';

/**
 * This action is responsible for disabling / enabling BTT. Does not affect this library or webserver
 */
export default class AToggleBTT extends Action { 
  protected id: number = Types.ACTION.TOGGLE_BTT;
}