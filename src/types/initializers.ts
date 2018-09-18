/**
 * This file prepares typings for the action initializers within btt instance
 */

import AHapticFeedback from '../common/actions/hapticFeedback';
import ASendText from '../common/actions/sendText';
import ADelayNextAction from '../common/actions/delayNextAction';
import AToggleBTT from '../common/actions/toggle';
import AStartSiri from '../common/actions/startSiri';
import ALaunchApplication from '../common/actions/launchApplication';
import AToggleApplication from '../common/actions/toggleApplication';
import AMute from '../common/actions/mute';
import ATriggerShortcut from '../common/actions/triggerShortcut';
import AToggleNightShift from '../common/actions/toggleNightShift';
import AToggleDnD from '../common/actions/toggleDnD';
import AToggleMouseSize from '../common/actions/toggleMouseSize';
import AToggleMouseSpeed from '../common/actions/toggleMouseSpeed';
import AToggleMouseCursor from '../common/actions/toggleMouseCursor';
import AToggleDarkMode from '../common/actions/toggleDarkMode';
import ALockScreen from '../common/actions/lockScreen';
import ALogout from '../common/actions/logout';
import ASleepDisplay from '../common/actions/sleepDisplay';
import ASleepComputer from '../common/actions/sleepComputer';
import ARestartBTT from '../common/actions/restart';
import AQuitBTT from '../common/actions/quit';
import ASendShortcut from '../common/actions/sendShortcut';
import AShowHUD from '../common/actions/showHUD';
import AMoveMouse from '../common/actions/moveMouse';
import AShowWebView from '../common/actions/showWebView';
import AExecuteScript from '../common/actions/executeScript';
import AShowNotification from '../common/actions/showNotification';
import AToggleTrueTone from '../common/actions/toggleTrueTone';
import ASaveSelectedText from '../common/actions/saveSelectedText';
import * as Types from './types';

export type EventMethod = (
  eventType: string,
  cb: (e: Types.IEventCallback) => any,
  options?: any,
) => void;
export type ToggleDnD = () => AToggleDnD;
export type ExecuteScript = (code: string) => AExecuteScript;
export type ToggleTrueTone = () => AToggleTrueTone;
export type ToggleNightShift = () => AToggleNightShift;
export type TriggerShortcut = (shortcut: string) => ATriggerShortcut;
export type ShowHUD = (config: Types.IShowHUDConfig) => AShowHUD;
export type SendText = (config: Types.ISendTextConfig) => ASendText;
export type HapticFeedback = (mode: number) => AHapticFeedback;
export type MoveMouse = (config: Types.IMoveMouseConfig) => AMoveMouse;
export type DelayNextAction = (timeout: number) => ADelayNextAction;
export type ToggleBTT = () => AToggleBTT;
export type StartSiri = () => AStartSiri;
export type Mute = () => AMute;
export type ToggleApplication = (applicationPath: string) => AToggleApplication;
export type LaunchApplication = (applicationPath: string) => ALaunchApplication;
export type SleepDisplay = () => ASleepDisplay;
export type Logout = () => ALogout;
export type LockScreen = () => ALockScreen;
export type ShowWebView = () => AShowWebView;
export type ToggleDarkMode = () => AToggleDarkMode;
export type ToggleMouseSize = () => AToggleMouseSize;
export type ToggleMouseCursor = () => AToggleMouseCursor;
export type ToggleMouseSpeed = () => AToggleMouseSpeed;
export type QuitBTT = () => AQuitBTT;
export type ShowNotification = (config: Types.IShowNotificationConfig) => AShowNotification;
export type RestartBTT = () => ARestartBTT;
export type SaveSelectedText = () => ASaveSelectedText;
export type SleepComputer = () => ASleepComputer;
export type SendShortcut = (shortcut: string, applicationPath: string, mdlsName?: string) => ASendShortcut;