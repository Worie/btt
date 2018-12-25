import * as Types from '../types/types';
import Utilities from '../abstract/utils';
import { execSync } from 'child_process';
import * as Path from 'path';
import * as PerformanceNow from 'performance-now';

export default class BackendUtilities extends Utilities {
  protected type: 'frontend' | 'backend' = 'backend';

  public async fetch(url: string, options?: any): Promise<any> {
    const fetch = require('node-fetch-polyfill');
    return fetch(url, options);
  }

  public deleteTrigger(uuid: string): void {
    execSync(`open 'btt://delete_trigger/?uuid=${uuid}'`);
  }

  public getNodeBinaryPath(): string {
    const path: string = Path.join(execSync('npm bin -g').toString().trim(), 'node');
    return path;
  }

  public getMdlsName(applicationPath: string): string {
    const mdlsName: string = execSync(`mdls -name kMDItemCFBundleIdentifier -r ${applicationPath}`).toString();
    return mdlsName;
  }

  /**
  * Sends a request to real BTT built in webserver with given data translated as GET query params
  */
  public async callBetterTouchTool(
    action: string, 
    data: Types.BttPayload,
    config: Types.AppConfig,
    translate: boolean = true,
  ): Promise<Types.CallResult> {
    return this.callWebserverApi(action, data, config, translate);
  }

  public performanceNow = PerformanceNow
}