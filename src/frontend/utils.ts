import * as Types from "../types/types";
import Utilities from "../abstract/utils";

export default class FrontendUtilities extends Utilities {
  protected type: "frontend" | "backend" = "frontend";

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

  /**
   * Sends a request to real BTT built in webserver with given data translated as GET query params
   */
  public async callBetterTouchTool(
    action: string,
    data: Types.BttPayload,
    config: Types.AppConfig,
    translate: boolean = true
  ): Promise<Types.CallResult> {
    if (this.isInBttWebView) {
      if (config.sharedSecret) {
        data["shared_secret"] = config.sharedSecret;
      }
      return this.callBttWebViewFunctions(action, data, translate);
    }
    return this.callWebserverApi(action, data, config, translate);
  }

  public performanceNow = () => {
    return window.performance.now();
  };

  private get isInBttWebView(): boolean {
    const WVWindow: Types.WebViewWindow = window as Types.WebViewWindow;
    return (
      Boolean(WVWindow.BTT) && typeof WVWindow.BTT.callHandler === "function"
    );
  }

  /**
   * Available only on frontend, because this is valid only for built in BTT webview
   * @param action
   * @param data
   * @param translate
   */
  private callBttWebViewFunctions(
    action: string,
    data: Types.BttPayload,
    translate: boolean
  ): Promise<Types.CallResult> {
    const start = Number(this.performanceNow().toFixed(3)) * 100;
    const WVWindow: Types.WebViewWindow = window as Types.WebViewWindow;
    let payload: Types.BttPayload = data;

    if (translate) {
      const properBttNotation = this.translateObjectKeysToBttNotation(
        data.json
      );
      payload = { ...payload, json: JSON.stringify(properBttNotation) };
    }

    return new Promise((res, rej) => {
      let timeout = setTimeout(
        () => rej("Error: timedout at webview window function"),
        30000
      );

      WVWindow.BTT.callHandler(action, payload, (result: any) => {
        const end = Number(this.performanceNow().toFixed(3)) * 100;
        clearTimeout(timeout);
        res({
          time: end / 100 - start / 100,
          value: result,
          note: "Invoked using built in webview window functions"
        });
      });
    });
  }
}
