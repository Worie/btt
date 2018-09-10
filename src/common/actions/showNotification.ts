import { EActions } from 'types/enum';
import { BaseAction } from 'common/action';
import * as Types from 'types/types';

/**
 * This action will show a system notification with given title and content
 */
export default class AShowNotification extends BaseAction { 
  protected id: EActions = EActions.RUN_APPLESCRIPT_IN_BG;

  public get data(): any {

    const config: Types.IShowNotificationConfig = this.arguments[0];

    return {
      "BTTTriggerClass" : "BTTTriggerTypeKeyboardShortcut",
      "BTTInlineAppleScript" : `display notification \"${config.content}\" with title \"${config.title}\"`,
      "BTTAdditionalConfiguration" : "786432",
    };
  }
}