import * as Types from '../../../types';
import { Action } from '../../common/action';

/**
 * This action will show a system notification with given title and content
 */
export default class AShowNotification extends Action { 
  protected id: number = Types.ACTION.RUN_APPLESCRIPT_IN_BG;
  /**
   * Returns a json of the current action. 
   * url and invoke properties of this class depend on this
   */
  public get data(): any {

    const config: Types.IShowNotificationConfig = this.arguments[0];

    return {
      "BTTTriggerClass" : "BTTTriggerTypeKeyboardShortcut",
      "BTTInlineAppleScript" : `display notification \"${config.content}\" with title \"${config.title}\"`,
      "BTTAdditionalConfiguration" : "786432",
    };
  }
}