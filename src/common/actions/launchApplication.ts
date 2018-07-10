import * as Types from '../../../types';
import { Action } from '../../common/action';

/**
 * This action is responsible for launching an application
 */
export default class ALaunchApplication extends Action {
  // reference name
  public static alias: string = 'launchApplication';
  /**
   * Returns a json of the current action. 
   * url and invoke properties of this class depend on this
   */
  public get json(): any {
    const applicationPath: string = this.arguments[0];

    return {
      "BTTPredefinedActionType" : Types.ACTION.LAUNCH_APPLICATION,
      "BTTLaunchPath" : `file://${applicationPath}`,
      "BTTEnabled2" : 1,
      "BTTEnabled" : 1,
    };
  }
}
