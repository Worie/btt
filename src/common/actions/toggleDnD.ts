import * as Types from '../../../types';
import { Action } from '../../common/action';

/**
 * This action is responsible for toggling do not disturb mode on target Mac
 */
export default class AToggleDnD extends Action { 
  // reference name
  public static alias: string = 'toggleDnD';

  /**
   * Returns a json of the current action. 
   * url and invoke properties of this class depend on this
   */
  public get json(): any {
    return {
      "BTTPredefinedActionType" : Types.ACTION.TOGGLE_DND,
      "BTTEnabled2" : 1,
      "BTTEnabled" : 1,
    };
  }
}