import * as Types from '../../../types';
import { Action } from '../../common/action';

/**
 * This action is responsible for toggling the Dark Mode on the target Mac
 */
export default class AToggleDarkMode extends Action { 
  // reference name
  public static alias: string = 'toggleDarkMode';

  /**
   * Returns a json of the current action. 
   * url and invoke properties of this class depend on this
   */
  public get json(): any {
    return {
      "BTTPredefinedActionType" : Types.ACTION.TOGGLE_DARK_MODE,
      "BTTEnabled2" : 1,
      "BTTEnabled" : 1,
    };
  }
}