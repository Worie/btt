import * as Types from '../../../types';
import { Action } from '../action';

/**
 * This action is responsible for typing / pasting text wherever the user currently is
 */
export default class ASendText extends Action { 
  protected id: number = Types.ACTION.INSERT_TYPE_PASTE_TEXT;
  /**
   * Returns a json of the current action. 
   * url and invoke properties of this class depend on this
   */
  public get data(): any {
    const actiionConfig: Types.ISendTextConfig = this.arguments[0];
    const { text, moveCursorLeft } = actiionConfig;

    return {
      "BTTMoveCursorLeftBy" : `${moveCursorLeft}`,
      "BTTStringToType" : `${text || 0}`,
    };
  }
}