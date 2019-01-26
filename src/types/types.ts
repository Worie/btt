import { EventCategory } from './enum';

export interface KeyDefinition {
  key: string;
  code: number;
  locationMask?: number;
  modifierValue?: number;
}

export interface CallResult {
  time: number;
  status?: number;
  value: any;
  note?: string;
}

export type ChainResponse = CallResult;

export type ChainEntry = () => Promise<CallResult>;

export interface AppConfig {
  domain: string;
  port: number;
  protocol: string;
  sharedKey?: string;
  version?: string;
  eventServer?: EventServerDefinition;
  nodeBinaryPath?: string;
  blacklist?: string[];
  silent?: boolean;
}

export interface EventServerDefinition {
  domain: string;
  port: number;
}

export interface TriggerConfig {
  uuid?: string;
  name?: string;
}

export interface WidgetConfig {
  uuid: string;
  default: Function;
}

export interface ActionRequirements {
  // a BTT version in which this action has been introduced
  min: string;
  // a BTT version in which this action has become deprecated
  max?: string;
  // versions in which this action seems buggy
  buggy?: string[];
  // optional name of an action
  name?: string;
}

export interface ActionConfig {
  requirements: ActionRequirements;
  name: string;
}

export interface ShowHUDConfig {
  title?: string;
  content?: string;
  duration?: number;
  background?: string;
  direction?: number;
}

export interface SendTextConfig {
  text: string;
  moveCursorLeft?: number;
}

export interface MoveMouseConfig {
  x: number;
  y: number;
  relativeTo?: number;
}

export interface ShowWebViewConfig {
  width: number;
  height: number;
  name: string;
  x?: number;
  y?: number;
  url?: string;
  html?: string;
  config?: FloatingWebViewConfig;
}

export interface FloatingWebViewConfig {
  cache?: boolean;
  closeOnClickOut?: boolean;
  whiteBackground?: boolean;
  closeOnBrowserOpen?: boolean;
  showButtons?: boolean;
}

export type ActionJSON = Partial<AppPayload>;

export interface EventParameter {
  actions: ActionJSON[];
  comment: string;
  additionalData: Partial<AppPayload>;
  requiredModifierKeys: ('fn' | 'cmd' | 'alt' | 'ctrl' | 'shift')[];
  // allows to specify the data that is not possible to pass
  // via simple event name
  config: BttPayload;
}

export interface ShowNotificationConfig {
  title: string;
  content: string;
}

export interface WidgetCreateConfig {
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
  };
}

export interface Class<T> {
  new (config: AppConfig, ...args: any[]): T;
}

export type KeyCombo = string;
export type AppPayload = Record<string, any>;
export type BttPayload = Record<string, any>;

export interface EventTrigger {
  id: number;
  category: EventCategory;
  name: string;
  notices?: NoticeMessage[];
}

export interface NoticeMessage {
  text: string;
  data?: Partial<AppPayload>;
}

export type EventCallback = (e: EventParameter) => void;

/**
 * ETR - EventTriggerRequirements (Additional options for some triggers)
 */

export interface ETRNamedTrigger {
  triggerName: string;
}

export interface ETRLaunchingOnSerialNumber {
  machineSerialNumber: string;
}

export interface ETRMoveMouseToCorner {
  delayBeforeTriggering: number;
  allowDragging: 0 | 1;
}

export type ETRMoveMouseToTopLeftCorner = ETRMoveMouseToCorner;
export type ETRMoveMouseToTopRightCorner = ETRMoveMouseToCorner;
export type ETRMoveMouseToBottomLeftCorner = ETRMoveMouseToCorner;
export type ETRMoveMouseToBottomRightCorner = ETRMoveMouseToCorner;

export interface ETRRecievedDistributedNotificationWithName {
  distributedNotificationName: string;
}

export enum BTTEndpoint {
  WIDGET_UPDATE = 'update_touch_bar_widget',
  WIDGET_REFRESH = 'refresh_widget',
  WIDGET_DELETE = 'delete_trigger',
  WIDGET_CLICK = 'execute_assigned_actions_for_trigger',
  WIDGET_CREATE = 'add_new_trigger',
  TRIGGER_UPDATE = 'update_trigger',
  TRIGGER_INVOKE = 'execute_assigned_actions_for_trigger',
  TRIGGER_NAMED_INVOKE = 'trigger_named',
  TRIGGER_DELETE = 'delete_trigger',
  TRIGGER_CREATE = 'add_new_trigger',
  TRIGGER_JSON = 'trigger_action',
}

export type WebViewWindow = Window & { BTT: any };
