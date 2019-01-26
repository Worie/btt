import { EActions } from '../../types/enum';
import { BaseAction } from '../../abstract/base-action';

/**
 * This action is responsible for toggling do not disturb mode on target Mac
 */
export default class AToggleDnD extends BaseAction {
  protected id: EActions = EActions.TOGGLE_DND;
}
