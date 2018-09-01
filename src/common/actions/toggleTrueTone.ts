import * as Types from '../../../types';
import { Action } from '../../common/action';

/**
 * This action will toggle true tone. You OS needs to support that feature.
 */
export default class AToggleTrueTone extends Action {
  protected id: number = Types.ACTION.TOGGLE_NIGHT_SHIFT;
}