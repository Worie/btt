import { EActions } from '../../types/enum';
import { BaseAction } from '../../abstract/base-action';
import * as Types from '../../types/types';
import CommonUtils from '../util';

/**
 * This action is responsible for showing a web view of specified URL or inline code.
 */
export default class AShowWebView extends BaseAction {
  protected id: EActions = EActions.SHOW_WEB_VIEW;

  public get data() {
    const actionConfig: Types.ShowWebViewConfig = this.arguments[0];
    const floatingHTMLConfig: Types.FloatingWebViewConfig = actionConfig.config || {};
    const { width, height, x, y, name, url, html } = actionConfig;

    const actionFloatingHTMLConfig: Partial<Types.AppPayload> = {
      CloseOnOutsideClick: floatingHTMLConfig.closeOnClickOut || true,
      UseWhiteBackground: floatingHTMLConfig.whiteBackground || false,
      CloseOnBrowserOpen: floatingHTMLConfig.closeOnBrowserOpen || true,
      ShowButtons: floatingHTMLConfig.showButtons || false,
      DoNotCache: floatingHTMLConfig.cache || true,
      Size: `{${width}, ${height}}`,
    };

    // if user defined at least one partial of position, set this to absolute position
    if (typeof x !== 'undefined' || typeof y !== 'undefined') {
      actionFloatingHTMLConfig.Position = `{${x || 0}, ${y || 0}}`;
    }

    const result: Partial<Types.AppPayload> = {
      ActionFloatingHTMLConfig: JSON.stringify(CommonUtils.translateObjectKeysToBttNotation(actionFloatingHTMLConfig)),
      ActionFloatingHTMLName: name,
    };

    if (url) {
      result.ActionURLToLoad = url;
    } else if (html) {
      result.Files = [
        {
          FileContent: Buffer.from(html).toString('base64'),
          FileOther: 'html',
        },
      ];
    } else {
      console.warn('Something went wrong - nor url nor html was passed');
    }

    return result;
  }
}
