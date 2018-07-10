import * as Types from '../../../types';
import { Action } from '../../common/action';
import * as DetectNode from 'detect-node';
import { mapShortcutNotationToBTT } from '../../common/keys';

let getMdlsName: any;

if (DetectNode) {
  getMdlsName = require('../../backend/util').getMdlsName;
} else {
  getMdlsName = (): null => undefined;
}

/**
 * This action is responsible for sending shortcut to specific application
 */
export default class ASendShortcut extends Action { 
  // reference name
  public static alias: string = 'sendShortcut';

  /**
   * Returns a json of the current action. 
   * url and invoke properties of this class depend on this
   */
  public get json(): any {
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
      "BTTPredefinedActionType" : Types.ACTION.SEND_SHORTCUT_TO_APP,
      "BTTShortcutApp" : applicationPath,
      "BTTShortcutToSend" : shortcutToSend,
      "BTTShortcutAppUnderCursor": mdlsValue.replace('/', '\\/'),
      "BTTEnabled2" : 1,
      "BTTEnabled" : 1,
    };
  }
}