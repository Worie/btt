import { EActions } from '../../types/enum';
import { BaseAction } from '../../abstract/base-action';

/**
 * This action is responsible for toggling between big and regular mouse cursor
 */
export default class AToggleMouseSize extends BaseAction {
  protected id: EActions = EActions.TOGGLE_MOUSE_SIZE;
}
