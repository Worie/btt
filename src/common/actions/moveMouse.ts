
import * as Types from '../../../types';
import { Action } from '../action';

/**
 * This action is responsible for moving mouse to specified position on the same monitor
 */
export default class AMoveMouse extends Action {
  protected id: number = Types.ACTION.MOVE_MOUSE;

  /**
   * Returns a json of the current action. 
   * url and invoke properties of this class depend on this
   */
  public get data(): any {
    const actionConfig: Types.IMoveMouseConfig = this.arguments[0];
    const { x, y, relativeTo } = actionConfig;


    return {
      "BTTMoveMouseToPosition" : `{${x}, ${y}}`,
      "BTTMoveMouseRelative" : `${relativeTo || 0}`,
    };
  }
}