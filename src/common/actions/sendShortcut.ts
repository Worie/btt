import { EActions } from 'types/enum';
import { BaseAction } from 'common/action';

import * as DetectNode from 'detect-node';
import { mapShortcutNotationToBTT } from '../keys';

let getMdlsName: any;

if (DetectNode) {
  getMdlsName = require('../../backend/util').getMdlsName;
} else {
  getMdlsName = (): null => undefined;
}

/**
 * This action is responsible for sending shortcut to specific application
 */
export default class ASendShortcut extends BaseAction {
  protected id: EActions = EActions.SEND_SHORTCUT_TO_APP;

  public get data(): any {
    const shortcut: string = this.arguments[0];
    const applicationPath: string = this.arguments[1];
    const mdlsName: string = this.arguments[2];

    const shortcutToSend: string = mapShortcutNotationToBTT(shortcut);

    const mdlsValue = getMdlsName(applicationPath) || mdlsName;

    if (!mdlsValue) {
      console.error(`Sorry, you'll have to manually provide mdls name of the app for this action to work`);
      return;
    }

    return {
      "BTTShortcutApp" : applicationPath,
      "BTTShortcutToSend" : shortcutToSend,
      "BTTShortcutAppUnderCursor": mdlsValue.replace('/', '\\/'),
    };
  }
}