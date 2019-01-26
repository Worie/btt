import { EActions } from '../../types/enum';
import { BaseAction } from '../../abstract/base-action';
import * as Types from '../../types/types';

/**
 * This action will show a system notification with given title and content
 */
export default class AShowNotification extends BaseAction {
  protected id: EActions = EActions.RUN_APPLESCRIPT_IN_BG;

  public get data() {
    const config: Types.ShowNotificationConfig = this.arguments[0];

    return {
      TriggerClass: 'BTTTriggerTypeKeyboardShortcut',
      InlineAppleScript: `display notification \"${config.content}\" with title \"${config.title}\"`,
      AdditionalConfiguration: '786432',
    };
  }
}
