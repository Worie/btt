import * as Types from '../../../types';
import { Action } from '../action';
import * as CommonUtils from '../util';

/**
 * This action is responsible for executing a node script
 */
export default class AExecuteScript extends Action { 
  protected id: number = Types.ACTION.EXECUTE_SCRIPT;
  /**
   * Returns a json of the current action. 
   * url and invoke properties of this class depend on this
   */
  public get data(): any {
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
      "BTTShellTaskActionScript" : code,
      "BTTShellTaskActionConfig" : shellScriptActionConfig,
    };
  }
}
