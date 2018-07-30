import * as Types from '../../../types';
import { Action } from '../action';
import * as CommonUtils from '../util';

/**
 * This action is responsible for executing a node script
 */
export default class AExecuteScript extends Action { 
  // reference name
  public static alias: string = 'executeScript';

  /**
   * Returns a json of the current action. 
   * url and invoke properties of this class depend on this
   */
  public get json(): any {
    const code: string = this.arguments[0];

    const binaryPath = CommonUtils.getNodeBinaryPath();

    if (!binaryPath && !this.config.nodeBinaryPath) {
      console.error('Sorry, you have to provide the node/bash binary path manually in the params');
      return;
    }

    // path to the executable, with slashes escaped
    const escapedPath = binaryPath.replace(/\//g, '\/');
  
    // btt format for executable path 
    const shellScriptActionConfig = `${escapedPath}:::-e:::esdsaijdoai`;

    return {
      "BTTPredefinedActionType" : Types.ACTION.EXECUTE_SCRIPT,
      "BTTShellTaskActionScript" : code,
      "BTTShellTaskActionConfig" : shellScriptActionConfig,
      "BTTEnabled2" : 1,
      "BTTEnabled" : 1,
    };
  }
}
