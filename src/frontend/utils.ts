import Utilities from '../abstract/utils';

export default class FrontendUtilities extends Utilities {
  
  public async fetch(url: string, options?: any): Promise<any> {
    return window.fetch(url, options);
  }

  public deleteTrigger(uuid: string): void {
    window.location.href = `btt://delete_trigger/?uuid=${uuid}`;
  }

  public getNodeBinaryPath(): string {
    return undefined;
  }

  public getMdlsName(applicationPath: string): string {
    return undefined;
  }
}