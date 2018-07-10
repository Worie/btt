import * as Types from '../../../types';
import { Action } from '../../common/action';

/**
 * This action is responsible for typing / pasting text wherever the user currently is
 */
export default class ASendText extends Action { 
  // reference name
  public static alias: string = 'sendText';

  /**
   * Returns a json of the current action. 
   * url and invoke properties of this class depend on this
   */
  public get json(): any {
    const actiionConfig: Types.ISendTextConfig = this.arguments[0];
    const { text, moveCursorLeft } = actiionConfig;

    return {
      "BTTPredefinedActionType" : Types.ACTION.INSERT_TYPE_PASTE_TEXT,
      "BTTEnabled2" : 1,
      "BTTEnabled" : 1,
      "BTTMoveCursorLeftBy" : `${moveCursorLeft}`,
      "BTTStringToType" : `${text || 0}`,
    };
  }
}