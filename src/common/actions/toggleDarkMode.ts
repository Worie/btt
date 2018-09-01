import * as Types from '../../../types';
import { Action } from '../action';

/**
 * This action is responsible for toggling the Dark Mode on the target Mac
 */
export default class AToggleDarkMode extends Action {
  protected id: number = Types.ACTION.TOGGLE_DARK_MODE;
}