import { EActions } from '../../types/enum';
import { BaseAction } from '../../abstract/base-action';
import CommonUtils from '../util';

/**
 * This action is responsible for executing a node script
 */
export default class AExecuteScript extends BaseAction {
  protected id: EActions = EActions.EXECUTE_SCRIPT;

  public get data() {
    const code: string = this.arguments[0];

    const binaryPath = CommonUtils.getNodeBinaryPath();

    if (!binaryPath && !this.config.nodeBinaryPath) {
      console.error('Sorry, you have to provide the node/bash binary path manually in the params');
      return undefined;
    }

    // path to the executable, with slashes escaped
    const escapedPath = (binaryPath ? binaryPath : this.config.nodeBinaryPath).replace(/\//g, '/');

    // btt format for executable path
    const shellScriptActionConfig = `${escapedPath}:::-e:::btt-generated-script`;

    return {
      ShellTaskActionScript: code,
      ShellTaskActionConfig: shellScriptActionConfig,
    };
  }
}
