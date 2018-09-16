export interface IBTTConfig {
  domain: string;
  port: number;
  protocol: string;
  sharedKey?: string;
  version?: string;
  eventServer?: IServerDefinition;
  nodeBinaryPath?: string;
}

export interface IServerDefinition {
  domain: string;
  port: number;
}

export interface ITriggerConfig {
  uuid?: string;
  name?: string;
}

export interface IWidgetConfig {
  uuid: string;
  default: Function;
}

export interface IActionRequirements {
  // a BTT version in which this action has been introduced
  min: string;
  // a BTT version in which this action has become deprecated
  max?: string;
  // versions in which this action seems buggy
  buggy?: string[];
  // optional name of an action
  name?: string;
}

export interface IActionConfig {
  requirements: IActionRequirements;
  name: string;
}

export interface IState {
  set: (key: string, value: string | number, isPersistent: boolean) => Promise<any>;
  get: (key: string, mode?: 'string' | 'number') => Promise<number | string>;
  delete: (key: string) => Promise<any>;
}

export interface IShowHUDConfig {
  title?: string;
  details?: string;
  duration?: number;
  background?: string;
  direction?: number;
}

export interface ISendTextConfig {
  text: string;
  moveCursorLeft?: number;
}

export interface IMoveMouseConfig {
  x: number;
  y: number;
  relativeTo?: number;
}

export interface IShowWebViewConfig {
  width: number;
  height: number;
  name: string;
  x?: number;
  y?: number;
  url?: string;
  html?: string;
  config?: IFloatingHTMLConfig;
}

export interface IFloatingHTMLConfig {
  cache?: boolean;
  closeOnClickOut?: boolean;
  whiteBackground?: boolean;
  closeOnBrowserOpen?: boolean;
  showButtons?: boolean;
}

export interface IEventCallback { 
  actions: ActionJSON[],
  comment: string;
}

export interface IShowNotificationConfig {
  title: string;
  content: string;
}

export interface ITouchbarWidgetCreateConfig {
  name: string; // 'touchbar widget name',
  mode: 'node' | 'bash';
  path: string;
  alwaysShow: boolean;
  script: string; // "console.log('foo');",
  appearance: {
    iconHeight: number; // 22,
    iconWidth: number; // 22,
    padding: number; // -5,
    freeSpaceAfterButton: number; // "5.000000",
    buttonColor: string; // "0.000000, 0.000000, 0.000000, 255.000000",
    alternateBackgroundColor: string; // "128.829533, 128.829533, 128.829533, 255.000000"
  },
}

export type ActionJSON = Record<string, any>;

export type IKeyCombo = string;