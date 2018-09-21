import { EActions } from '../../types/enum';
import { BaseAction } from '../../abstract/base-action';

/**
 * This action is responsible for toggling cursor visibility
 */
export default class AToggleMouseCursor extends BaseAction { 
  protected id: EActions = EActions.TOGGLE_MOUSE_CURSOR;
}