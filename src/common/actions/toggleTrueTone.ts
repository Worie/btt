import { EActions } from 'types/enum';
import { BaseAction } from 'common/action';

/**
 * This action will toggle true tone. You OS needs to support that feature.
 */
export default class AToggleTrueTone extends BaseAction {
  protected id: EActions = EActions.TOGGLE_NIGHT_SHIFT;
}