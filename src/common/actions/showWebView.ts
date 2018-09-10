import { EActions } from 'types/enum';
import { BaseAction } from 'common/action';
import * as Types from 'types/types';

import * as uuidv4 from 'uuid/v4';

/**
 * This action is responsible for showing a web view of specified URL or inline code.
 */
export default class AShowWebView extends BaseAction {
  protected id: EActions = EActions.SHOW_WEB_VIEW;
  
  public get data(): any {
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
      BTTActionFloatingHTMLConfig["BTTPosition"] = `{${x || 0}, ${y || 0}}`;
    }
  
    const result: any = {
      "BTTActionFloatingHTMLConfig" : JSON.stringify(BTTActionFloatingHTMLConfig),
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