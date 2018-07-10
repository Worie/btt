import { mapShortcutNotationToBTT } from '../../common/keys';
import * as Types from '../../../types';
import { Action } from '../../common/action';

/**
 * This action is responsible for triggering a keyboard shortcut - for example, cmd+space for spotlight 
 */
export default class ATriggerShortcut extends Action {
  // reference name
  public static alias: string = 'triggerShortcut';

  /**
   * Returns a json of the current action. 
   * url and invoke properties of this class depend on this
   */
  public get json(): any {
    const shortcut: string = this.arguments[0];
    const shortcutToSend: string = mapShortcutNotationToBTT(shortcut);

    return {
      "BTTPredefinedActionType" : Types.ACTION.SEND_SHORTCUT,
      "BTTShortcutToSend" : shortcutToSend,
      "BTTEnabled2" : 1,
      "BTTEnabled" : 1,
    };
  }
}