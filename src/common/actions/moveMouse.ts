import { EActions } from 'types/enum';
import { BaseAction } from 'common/action';
import * as Types from 'types/types';

/**
 * This action is responsible for moving mouse to specified position on the same monitor
 */
export default class AMoveMouse extends BaseAction {
  protected id: EActions = EActions.MOVE_MOUSE;

  public get data(): any {
    const actionConfig: Types.IMoveMouseConfig = this.arguments[0];
    const { x, y, relativeTo } = actionConfig;

    return {
      "BTTMoveMouseToPosition" : `{${x}, ${y}}`,
      "BTTMoveMouseRelative" : `${relativeTo || 0}`,
    };
  }
}