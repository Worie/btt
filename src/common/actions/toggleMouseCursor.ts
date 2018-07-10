import * as Types from '../../../types';
import { Action } from '../../common/action';

/**
 * This action is responsible for toggling cursor visibility
 */
export default class AToggleMouseCursor extends Action { 
  // reference name
  public static alias: string = 'toggleMouseCursor';

  /**
   * Returns a json of the current action. 
   * url and invoke properties of this class depend on this
   */
  public get json(): any {
    return {
      "BTTPredefinedActionType" : Types.ACTION.TOGGLE_MOUSE_CURSOR,
      "BTTEnabled2" : 1,
      "BTTEnabled" : 1,
    };
  }
}