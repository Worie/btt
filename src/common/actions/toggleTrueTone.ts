import { EActions } from '../../types/enum';
import { BaseAction } from '../../abstract/base-action';

/**
 * This action will toggle true tone
 */
export default class AToggleTrueTone extends BaseAction {
  protected id: EActions = EActions.TOGGLE_NIGHT_SHIFT;
}