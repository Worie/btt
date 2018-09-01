import { mapShortcutNotationToBTT } from '../keys';
import * as Types from '../../../types';
import { Action } from '../action';

/**
 * This action is responsible for triggering a keyboard shortcut - for example, cmd+space for spotlight 
 */
export default class ATriggerShortcut extends Action {
  protected id: number = Types.ACTION.SEND_SHORTCUT;
  /**
   * Returns a json of the current action. 
   * url and invoke properties of this class depend on this
   */
  public get data(): any {
    const shortcut: string = this.arguments[0];
    const shortcutToSend: string = mapShortcutNotationToBTT(shortcut);

    return {
      "BTTShortcutToSend" : shortcutToSend,
    };
  }
}