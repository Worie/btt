/**
 * Represents a BTT TouchBar Widget.
 * For "typings structure" refer to the https://github.com/Microsoft/TypeScript/issues/13462#issuecomment-295685298
 */

import * as CommonUtils from './util';
import { ETouchBarWidgets } from '../types/enum';
import * as Types from '../types/types';

export class Widget {
  // stores the uuid of the existing btt widget
  private uuid: string;

  // stores the default update behaviour of the widget
  private default: Function;    

  // holds the config of the current instance
  private config: Types.IBTTConfig;

  /**
   * Creates an instance representing BTT Widget
   * @param {*} config 
   */
  public constructor(
    config: Types.IBTTConfig,
    widgetConfig: Types.IWidgetConfig,
  ) {
    this.uuid = widgetConfig.uuid;
    this.default = widgetConfig.default;

    this.config = config;
  }

  /**
   * Updates the current widget with given data
   * @param {*} data 
   */
  async update(data?: any): Promise<void> {
    // if there was no data passed, nor there was no default fallback
    if (!data && !this.default) {
      // show a warning and stop the execution of the function
      console.warn('Nothing to do for widget ' + this.uuid);
      return;
    // if there's no data passed but default function was passed
    } else if (!data) {
      // update the widget using the data from default function
      return this.update(this.default());
    }

    // just make sure that uuid field does not exist in data
    delete data.uuid;

    // data used in query params in final endpoint
    const updateData = {
      uuid: this.uuid,
      ...data,
    };

    // update current widget
    return CommonUtils.makeAction('update_touch_bar_widget', updateData, this.config);
  }

  /**
   * Refreshes current widget
   */
  public async refresh(): Promise<void> {
    return CommonUtils.makeAction('refresh_widget', { uuid: this.uuid }, this.config);
  }

  /**
   * Triggers the widget
   */
  public async click(): Promise<void> {
    return CommonUtils.makeAction('execute_assigned_actions_for_trigger', {
      uuid: this.uuid,
    }, this.config);
  }
};

/**
 * Creates Widget class instance with given config
 */
export class FWidget {
  private config: Types.IBTTConfig;

  /**
   * Takes an IBTTConfig as a constructor parameter
   * @param config 
   */
  public constructor(config: Types.IBTTConfig) {
    this.config = config;
  }

  /**
   * Returns a new Widget class instance and automatically passes the current btt instance config
   * @param config 
   */
  public get(config: Types.IWidgetConfig): Widget {
    return new Widget(this.config, config);
  }

  /**
   * Creates a new BetterTouchTool touchbar widget and returns its instance
   * @param options: Types.ITouchbarWidgetCreateConfig
   */
  public async create(options: Types.ITouchbarWidgetCreateConfig): Promise<any> {    
    const uuid = CommonUtils.generateUuidForString(JSON.stringify(options));

    const binaryPath = CommonUtils.getNodeBinaryPath();

    if (!binaryPath && !options.path) {
      console.error('Sorry, you have to provide the node/bash binary path manually in the params');
      return;
    }

    // path to the executable, with slashes escaped
    const escapedPath = (options.path ? options.path : binaryPath).replace(/\//g, '\/');
    
    // btt format for executable path 
    const shellScriptWidgetGestureConfig = `${escapedPath}:::${(options.mode === 'node' ? '-e' : '-c')}`;

    // real payload that'll create a widget
    const BTTPayload: any = {
      "BTTWidgetName" : options.name,
      "BTTTriggerType" : ETouchBarWidgets.CREATE,
      "BTTTriggerClass" : "BTTTriggerTypeTouchBar",
      "BTTPredefinedActionType" : -1,
      "BTTPredefinedActionName" : "No Action",
      "BTTShellScriptWidgetGestureConfig" : shellScriptWidgetGestureConfig,
      "BTTEnabled2" : 1,
      "BTTUUID" : uuid,
      "BTTEnabled" : 1,
      "BTTOrder" : 9999,
      "BTTTriggerConfig" : {
        "BTTTouchBarItemIconHeight" : options.appearance.iconHeight,
        "BTTTouchBarItemIconWidth" : options.appearance.iconWidth,
        "BTTTouchBarItemPadding" : options.appearance.padding,
        "BTTTouchBarFreeSpaceAfterButton" : String(options.appearance.freeSpaceAfterButton),
        "BTTTouchBarButtonColor" : options.appearance.buttonColor,
        "BTTTouchBarAlwaysShowButton" : String(Number(options.alwaysShow)),
        "BTTTouchBarShellScriptString" : options.script,
        "BTTTouchBarAlternateBackgroundColor" : options.appearance.alternateBackgroundColor
      },
    };
    
    // make the request to the BTT API to create new widget
    await CommonUtils.makeAction('add_new_trigger', {
      json: JSON.stringify(BTTPayload),
    }, this.config);

    // get the instance representing the newly created widget
    return new Widget(this.config, { uuid, default: undefined });
  }
}