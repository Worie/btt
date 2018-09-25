import { EActions } from '../../types/enum';
import { BaseAction } from '../../abstract/base-action';
import * as Types from '../../types/types';

/**
 * This action is responsible for moving mouse to specified position on the same monitor
 */
export default class AMoveMouse extends BaseAction {
  protected id: EActions = EActions.MOVE_MOUSE;

  public get data() {
    const actionConfig: Types.MoveMouseConfig = this.arguments[0];
    const { x, y, relativeTo } = actionConfig;

    return {
      MoveMouseToPosition: `{${x}, ${y}}`,
      MoveMouseRelative: `${relativeTo || 0}`,
    };
  }
}