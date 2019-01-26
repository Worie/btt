import { EActions } from '../../types/enum';
import { BaseAction } from '../../abstract/base-action';
import CommonUtils from '../util';

/**
 * This action is responsible for toggling the visibility of specified application
 */
export default class AToggleApplication extends BaseAction {
  protected id: EActions = EActions.TOGGLE_APPLICATION;

  public get data() {
    const applicationPath: string = this.arguments[0];
    const binaryPath: string = this.arguments[1];

    const mdlsValue: string = CommonUtils.getMdlsName(applicationPath) || binaryPath;

    if (!mdlsValue) {
      console.error(`Sorry, you'll have to manually provide mdls name of the app for this action to work`);
      return;
    }

    return {
      AppToShowOrHide: mdlsValue,
    };
  }
}
