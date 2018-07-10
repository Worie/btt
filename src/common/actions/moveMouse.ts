
import * as Types from '../../../types';
import { Action } from '../../common/action';

/**
 * This action is responsible for moving mouse to specified position on the same monitor
 */
export default class AMoveMouse extends Action { 
  // reference name
  public static alias: string = 'moveMouse';

  /**
   * Returns a json of the current action. 
   * url and invoke properties of this class depend on this
   */
  public get json(): any {
    const actionConfig: Types.IMoveMouseConfig = this.arguments[0];
    const { x, y, relativeTo } = actionConfig;


    return {
      "BTTPredefinedActionType" : Types.ACTION.MOVE_MOUSE,
      "BTTMoveMouseToPosition" : `{${x}, ${y}`,
      "BTTMoveMouseRelative" : `${relativeTo || 0}`,
      "BTTEnabled2" : 1,
      "BTTEnabled" : 1,
    };
  }
}