import * as Types from '../../../types';
import { Action } from '../../common/action';
import * as uuidv4 from 'uuid/v4';

/**
 * This action is responsible for showing a web view of specified URL or inline code.
 */
export default class AShowWebView extends Action {
  // reference name
  public static alias: string = 'showWebView';

  /**
   * Returns a json of the current action. 
   * url and invoke properties of this class depend on this
   */
  public get json(): any {
    const actionConfig: Types.IShowWebViewConfig = this.arguments[0];
    const floatingHTMLConfig: Types.IFloatingHTMLConfig = actionConfig.config || {};
    const { width, height, x, y, name, url, html } = actionConfig;

    const BTTActionFloatingHTMLConfig: any = {
      "BTTCloseOnOutsideClick": floatingHTMLConfig.closeOnClickOut || true,
      "BTTUseWhiteBackground": floatingHTMLConfig.whiteBackground || false,
      "BTTCloseOnBrowserOpen": floatingHTMLConfig.closeOnBrowserOpen || true,
      "BTTShowButtons": floatingHTMLConfig.showButtons || false,
      "BTTDoNotCache": floatingHTMLConfig.cache || true,
      "BTTSize": `{${width}, ${height}}`,
    };
    
    // if user defined at least one partial of position, set this to absolute position
    if (typeof x !== 'undefined' || typeof y !== 'undefined') {
      BTTActionFloatingHTMLConfig["BTTPosition"] = `{${x || 0}, ${y || 0}`;
    }
  
    const result: any = {
      "BTTPredefinedActionType" : Types.ACTION.SHOW_WEB_VIEW,
      "BTTActionFloatingHTMLConfig" : JSON.stringify(BTTActionFloatingHTMLConfig),
      "BTTEnabled2" : 1,
      "BTTEnabled" : 1,
      "BTTActionFloatingHTMLName": name,
      "BTTUUID": uuidv4(),
    };
  
    if (url) {
      result["BTTActionURLToLoad"] = url;
    } else if (html) {
      result["BTTFiles"] = [{
        "BTTFileContent" : Buffer.from(html).toString('base64'),
        "BTTFileOther" : "html"
      }];
    } else {
      console.warn('Something went wrong - nor url nor html was passed');
    }
  
    return result;
  }
}