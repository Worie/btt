import { mapShortcutNotationToBTT } from '../keys';
import { EActions } from '../../types/enum';
import { BaseAction } from '../action';

/**
 * This action is responsible for triggering a keyboard shortcut - for example, cmd+space for spotlight 
 */
export default class ATriggerShortcut extends BaseAction {
  protected id: EActions = EActions.SEND_SHORTCUT;

  public get data(): any {
    const shortcut: string = this.arguments[0];
    const shortcutToSend: string = mapShortcutNotationToBTT(shortcut);

    return {
      "BTTShortcutToSend" : shortcutToSend,
    };
  }
}