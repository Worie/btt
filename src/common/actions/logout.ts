import * as Types from '../../../types';
import { Action } from '../action';

/**
 * This action is responsible for logging out the current user
 */
export default class ALogout extends Action { 
  protected id: number = Types.ACTION.LOGOUT;
}