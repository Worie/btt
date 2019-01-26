import { EActions } from '../../types/enum';
import { BaseAction } from '../../abstract/base-action';

/**
 * This action is responsible for launching an application
 */
export default class ALaunchApplication extends BaseAction {
  protected id: EActions = EActions.LAUNCH_APPLICATION;

  public get data() {
    const applicationPath: string = this.arguments[0];

    return {
      LaunchPath: `file://${applicationPath}`,
    };
  }
}
