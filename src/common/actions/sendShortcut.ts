import { EActions } from '../../types/enum';
import { BaseAction } from '../../abstract/base-action';
import Keys from '../keys';
import CommonUtils from '../util';

/**
 * This action is responsible for sending shortcut to specific application
 */
export default class ASendShortcut extends BaseAction {
  protected id: EActions = EActions.SEND_SHORTCUT_TO_APP;

  public get data() {
    const shortcut: string = this.arguments[0];
    const applicationPath: string = this.arguments[1];
    const mdlsName: string = this.arguments[2];

    const shortcutToSend: string = Keys.mapShortcutNotationToBTT(shortcut);

    const mdlsValue = CommonUtils.getMdlsName(applicationPath) || mdlsName;

    if (!mdlsValue) {
      console.error(`Sorry, you'll have to manually provide mdls name of the app for this action to work`);
      return;
    }

    return {
      ShortcutApp: applicationPath,
      ShortcutToSend: shortcutToSend,
      ShortcutAppUnderCursor: mdlsValue.replace('/', '\\/'),
    };
  }
}