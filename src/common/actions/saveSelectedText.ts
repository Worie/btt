import { EActions } from '../../types/enum';
import { BaseAction } from '../action';

/**
 * This action is responsible for saving currently selected text to btt variable `selected_text`
 * It'll be available from `await btt.state.get('selected_text')`
 */
export default class ASaveSelectedText extends BaseAction { 
  protected id: EActions = EActions.SAVE_SELECTED_TEXT;
}