import * as Types from '../../../types';
import { Action } from '../action';

/**
 * This action is responsible for launching an application
 */
export default class ALaunchApplication extends Action {
  protected id: number = Types.ACTION.LAUNCH_APPLICATION;
  /**
   * Returns a json of the current action. 
   * url and invoke properties of this class depend on this
   */
  public get data(): any {
    const applicationPath: string = this.arguments[0];

    return {
      "BTTLaunchPath" : `file://${applicationPath}`,
    };
  }
}
