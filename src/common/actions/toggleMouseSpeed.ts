import * as Types from '../../../types';
import { Action } from '../../common/action';

/**
 * This action is responsible for toggling between fast and regular mouse speed
 */
export default class AToggleMouseSpeed extends Action { 
  // reference name
  public static alias: string = 'toggleMouseSpeed';

  /**
   * Returns a json of the current action. 
   * url and invoke properties of this class depend on this
   */
  public get json(): any {
    return {
      "BTTPredefinedActionType" : Types.ACTION.TOGGLE_MOUSE_SPEED,
      "BTTEnabled2" : 1,
      "BTTEnabled" : 1,
    };
  }
}
