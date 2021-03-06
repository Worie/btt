import Keys from '../keys';
import { EActions } from '../../types/enum';
import { BaseAction } from '../../abstract/base-action';

/**
 * This action is responsible for triggering a keyboard shortcut - for example, cmd+space for spotlight
 */
export default class ATriggerShortcut extends BaseAction {
  protected id: EActions = EActions.SEND_SHORTCUT;

  public get data() {
    const shortcut: string = this.arguments[0];
    const shortcutToSend: string = Keys.mapShortcutNotationToBTT(shortcut);

    return {
      ShortcutToSend: shortcutToSend,
    };
  }
}
