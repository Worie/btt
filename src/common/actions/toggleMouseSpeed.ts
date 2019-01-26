import { EActions } from '../../types/enum';
import { BaseAction } from '../../abstract/base-action';

/**
 * This action is responsible for toggling between fast and regular mouse speed
 */
export default class AToggleMouseSpeed extends BaseAction {
  protected id: EActions = EActions.TOGGLE_MOUSE_SPEED;
}
