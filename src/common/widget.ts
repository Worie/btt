/**
 * Represents a BTT TouchBar Widget.
 */

import CommonUtils from './util';
import { ETouchBarWidgets } from '../types/enum';
import * as Types from '../types/types';
import { BttPayload, BTTEndpoint } from '../types/types';

export class Widget {
  // stores the uuid of the existing btt widget
  public uuid: string;

  // stores the default update behaviour of the widget
  private default: Function;

  // holds the config of the current instance
  private config: Types.AppConfig;

  /**
   * Creates an instance representing BTT Widget
   * @param config
   * @param widgetConfig
   */
  public constructor(config: Types.AppConfig, widgetConfig: Types.WidgetConfig) {
    this.uuid = widgetConfig.uuid;
    this.default = widgetConfig.default;

    this.config = config;
  }

  /**
   * Updates the current widget with given data
   * @param data
   */
  public async update(data?: Partial<BttPayload>): Promise<Types.CallResult> {
    // if there was no data passed, nor there was no default fallback
    if (!data && !this.default) {
      // show a warning and stop the execution of the function
      console.warn('Nothing to do for widget ' + this.uuid);
      return undefined;
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
    return this.callBTTWithContext(BTTEndpoint.WIDGET_UPDATE, updateData);
  }

  /**
   * Refreshes current widget
   */
  public async refresh(): Promise<Types.CallResult> {
    return this.callBTTWithContext(BTTEndpoint.WIDGET_REFRESH, { uuid: this.uuid });
  }

  /**
   * Triggers the widget
   */
  public async click(): Promise<Types.CallResult> {
    return this.callBTTWithContext(BTTEndpoint.WIDGET_CLICK, { uuid: this.uuid });
  }

  /**
   * Removes current widget
   */
  public async delete() {
    return this.callBTTWithContext(BTTEndpoint.WIDGET_DELETE, { uuid: this.uuid });
  }

  /**
   * Allows to set the default callback programatically
   */
  public setDefaultCallback(cb: Function): void {
    this.default = cb.bind(this);
  }

  /**
   * Calls BTT with given payload using widget context
   * @TODO may be made reusable
   * @param mode
   * @param payload
   */
  private async callBTTWithContext(mode: string, payload: BttPayload): Promise<Types.CallResult> {
    return CommonUtils.callBetterTouchTool(mode, payload, this.config, false);
  }
}

/**
 * Creates Widget class instance with given config
 */
export class FWidget {
  private config: Types.AppConfig;

  /**
   * Takes an AppConfig as a constructor parameter
   * @param config
   */
  public constructor(config: Types.AppConfig) {
    this.config = config;
  }

  /**
   * Returns a new Widget class instance and automatically passes the current btt instance config
   * @param config
   */
  public get(config: Types.WidgetConfig): Widget {
    return new Widget(this.config, config);
  }

  /**
   * Creates a new BetterTouchTool touchbar widget and returns its instance
   * @param options: Types.ITouchbarWidgetCreateConfig
   */
  public async create(options: Types.WidgetCreateConfig): Promise<Widget> {
    const uuid = CommonUtils.generateUuidForString(JSON.stringify(options));

    const binaryPath = CommonUtils.getNodeBinaryPath();

    // path to the executable, with slashes escaped
    const escapedPath = (options.path || binaryPath || '/bin/bash').replace(/\//g, '/');

    const mode = (binaryPath === '/bin/bash' ? 'bash' : false) || options.mode;

    // btt format for executable path
    const shellScriptWidgetGestureConfig = `${escapedPath}:::${mode === 'node' ? '-e' : '-c'}`;

    // library payload that'll create a widget later
    const appPayload: Types.AppPayload = {
      WidgetName: options.name,
      TriggerType: ETouchBarWidgets.CREATE,
      TriggerClass: 'BTTTriggerTypeTouchBar',
      PredefinedActionType: -1,
      PredefinedActionName: 'No Action',
      ShellScriptWidgetGestureConfig: shellScriptWidgetGestureConfig,
      Enabled2: 1,
      UUID: uuid,
      Enabled: 1,
      Order: 9999,
      TriggerConfig: {
        TouchBarScriptUpdateInterval: 0,
        TouchBarAppleScriptStringRunOnInit: false,
        TouchBarItemIconHeight: options.appearance.iconHeight,
        TouchBarItemIconWidth: options.appearance.iconWidth,
        TouchBarItemPadding: options.appearance.padding,
        TouchBarFreeSpaceAfterButton: String(options.appearance.freeSpaceAfterButton),
        TouchBarButtonColor: options.appearance.buttonColor,
        TouchBarAlwaysShowButton: String(Number(options.alwaysShow)),
        TouchBarShellScriptString: options.script,
        TouchBarAlternateBackgroundColor: options.appearance.alternateBackgroundColor,
      },
    };

    // make the request to the BTT API to create new widget
    await CommonUtils.callBetterTouchTool(
      BTTEndpoint.WIDGET_CREATE,
      {
        json: appPayload,
      },
      this.config,
      true,
    );

    // get the instance representing the newly created widget
    return new Widget(this.config, { uuid, default: undefined });
  }
}
