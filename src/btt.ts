import { FTrigger } from './common/trigger';
import { FWidget } from './common/widget';
import VariableStore from './common/state';
import * as Types from '../types';
import * as CommonUtils from './common/util';

import AHapticFeedback from './common/actions/hapticFeedback';
import ASendText from './common/actions/sendText';
import ADelayNextAction from './common/actions/delayNextAction';
import AToggleBTT from './common/actions/toggle';
import AStartSiri from './common/actions/startSiri';
import ALaunchApplication from './common/actions/launchApplication';
import AToggleApplication from './common/actions/toggleApplication';
import AMute from './common/actions/mute';
import ATriggerShortcut from './common/actions/triggerShortcut';
import AToggleNightShift from './common/actions/toggleNightShift';
import AToggleDnD from './common/actions/toggleDnD';
import AToggleMouseSize from './common/actions/toggleMouseSize';
import AToggleMouseSpeed from './common/actions/toggleMouseSpeed';
import AToggleMouseCursor from './common/actions/toggleMouseCursor';
import AToggleDarkMode from './common/actions/toggleDarkMode';
import ALockScreen from './common/actions/lockScreen';
import ALogout from './common/actions/logout';
import ASleepDisplay from './common/actions/sleepDisplay';
import ASleepComputer from './common/actions/sleepComputer';
import ARestartBTT from './common/actions/restart';
import AQuitBTT from './common/actions/quit';
import ASendShortcut from './common/actions/sendShortcut';
import AShowHUD from './common/actions/showHUD';
import AMoveMouse from './common/actions/moveMouse';
import AShowWebView from './common/actions/showWebView';
import AExecuteScript from './common/actions/executeScript';
import EventManager from './common/events';
import AShowNotification from './common/actions/showNotification';
import AToggleTrueTone from './common/actions/toggleTrueTone';

import Action from './common/actions/util/action-factory';

/**
 * Class used to manage the BTT webserver 
 * @constructor IBTTConfig
 */
export class Btt {
  // state, manages BTT variables
  public state: VariableStore;

  // stores Trigger factory
  public Trigger: FTrigger;

  // stores Widget factory
  public Widget: FWidget;

  // stores the config from the constructor
  private config: Types.IBTTConfig;

  // event manager
  private event: EventManager;

  /**
   * Creates BTT instance which communicates with BetterTouchTool built in webserver
   */
  constructor(config: Types.IBTTConfig) {
    this.config = config;
    
    // initialize the Widget factory
    this.Widget = new FWidget(config);

    // initialize new trigger
    this.Trigger = new FTrigger(config);

    // initialize the state (variable management)
    this.state = new VariableStore(config);

    // initialize event manager
    this.event = new EventManager(config);
  }

  /**
   * Sends a request to real BTT built in webserver with given data translated as GET query params
   */
  public do(
    action: string,
    data: Record<string, any>
  ): Promise<any> {
    return CommonUtils.makeAction(action, data, this.config);
  }

  /**
   * Creates actual event listener that'll be run upon certain event type detection.
   * The code will be invoked in btt-node-server, and this method is dependand on this project
   * 
   * Keep in mind that this is persisent - it'll exist until you manually delete it.
   * 
   * @param eventType event type of specific action (for example, oneFingerForceClick)
   * @param cb callback function that'll be invoked upon event detection
   */
  public addEventListener(
    eventType: string,
    cb: (e: any) => {},
  ): void {
    return this.event.addEventListener(eventType, cb);
  }

  /**
   * Removes previously created event listener
   * 
   * @param eventType event type of specific action (for example, oneFingerForceClick)
   * @param cb callback function that'll be invoked upon event detection
   */
  public removeEventListener(
    eventType: string,
    cb: (e: any) => {},
  ): void {
    return this.event.removeEventListener(eventType, cb);
  }

  /**
   * Adds a trigger action to the BetterTouchTool. Keep in mind, that the callback function that
   * you'll pass to this function will be invoked upon registering the action in the BetterTouchTool,
   * not after you trigger the specific eventType! 
   * 
   * Keep in mind that this is persisent - it'll exist until you manually delete it.
   * 
   * @param eventType event type of specific action (for example, oneFingerForceClick)
   * @param cb callback function that'll define what actions should be executed
   * @param options additional options if you want to override the JSON somehow to fit your needs
   */
  public addTriggerAction(
    eventType: string,
    cb: (e: Types.IEventCallback) => {},
    options?: any,
  ): void {
    return this.event.addTriggerAction(eventType, cb, options);
  }

  /**
   * Removes a trigger of specified ID from the BetterTouchTool
   * 
   * @param eventType event type of specific action (for example, oneFingerForceClick)
   * @param cb a callback that was intended to run
   */
  public removeTriggerAction(
    eventType: string,
    cb: (e: Types.IEventCallback) => {},
  ): void {    
    return this.event.removeTriggerAction(eventType, cb);
  }

  /** ACTIONS */

  /**
   * Sends shortcut to txhe application. Some apps need to have focus so they can recieve shortcuts.
   * 
   * @param shortcut key identifiers separated by space
   * @param applicationPath absolute path pointing to the app which should recieve shortcut
   * @param applicationPath required for BTT to recognize the app, whithin browser env must be provided manually
   */
  @Action(ASendShortcut)
  public sendShortcut: (shortcut: string, applicationPath: string, mdlsName?: string) => ASendShortcut;

  /**
   * Executes passed nodejs script. Requires manual specificying of node executable binary if used on frontend
   * 
   * @param code a code to run
   */
  @Action(AExecuteScript)
  public executeScript: (code: string) => AExecuteScript;

  /**
   * Toggles do not disturb mode
   */
  @Action(AToggleDnD)
  public toggleDnD: () => AToggleDnD

  /**
   * Toggles do not disturb mode
   */
  @Action(AToggleTrueTone)
  public toggleTrueTone: () => AToggleTrueTone;
  
  /**
   * Toggles night shift
   */
  @Action(AToggleNightShift)
  public toggleNightShift: () => AToggleNightShift;

  /**
   * Triggers system wide keyboard shortcut
   * @param shortcut key identifiers separated by space
   */
  @Action(ATriggerShortcut) 
  public triggerShortcut: (shortcut: string) => ATriggerShortcut;

  /**
   * Shows HUD with given config
   */
  @Action(AShowHUD)
  public showHUD: (config: Types.IShowHUDConfig) => AShowHUD;

  /**
   * Sends / Types / Inserts / Pastes custom text
   */
  @Action(ASendText)
  public sendText: (config: Types.ISendTextConfig) => ASendText;

  /**
   * Triggers a haptic response. Takes a number as a param due to BTT lack of information
   * which ID represents which mode, in order to know what value represents what open BTT and map 
   * the order of selects options in config of "Perform Haptic Feedback on Trackpad" action
   * 
   * @param hapticMode a number representing each mode.
   */
  @Action(AHapticFeedback)
  public hapticFeedback: (mode: number) => AHapticFeedback;

  /**
   * Open an application on the given path
   */
  @Action(ALaunchApplication)
  public launchApplication: (applicationPath: string) => ALaunchApplication;

  /**
   * Toggles the visibility of given application
   */
  @Action(AToggleApplication)
  public toggleApplication: (applicationPath: string) => AToggleApplication;

  /**
   * Toggles the mute state in the system
   */
  @Action(AMute)
  public mute: () => AMute;

  /**
   * Starts Siri
   */
  @Action(AStartSiri)
  public startSiri: () => AStartSiri;

  /**
   * Toggles the BetterTouchTool gesture recognition
   */
  @Action(AToggleBTT)
  public toggle: () => AToggleBTT;

  /**
   * Delays the next action. For most cases manually managing the execution of actions in JavaScript
   * should be sufficient - this will block any new action that BTT will recieve by the given am
   * 
   * @param timeout - time in miliseconds during any action execution will be delayed
   */
  @Action(ADelayNextAction)
  public delayNextAction: (timeout: number) => ADelayNextAction;

  /**
   * Moves mouse to specified position
   */
  @Action(AMoveMouse)
  public moveMouse: (config: Types.IMoveMouseConfig) => AMoveMouse;

  /**
   * Toggles the mouse speed between a regular and speeded up one
   */
  @Action(AToggleMouseSpeed)
  public toggleMouseSpeed: () => AToggleMouseSpeed;

  /**
   * Toggles mouse cursor visibility
   */
  @Action(AToggleMouseCursor)
  public toggleMouseCursor: () => AToggleMouseCursor;

  /**
   * Toggles between the big and regular mouse cursor size
   */
  @Action(AToggleMouseSize)
  public toggleMouseSize: () => AToggleMouseSize;

  /**
   * Toggles the system dark mode 
   */
  @Action(AToggleDarkMode)
  public toggleDarkMode: () => AToggleDarkMode;

  /**
   * Opens a web view
   */
  @Action(AShowWebView)
  public showWebView: () => AShowWebView;

  /**
   * Locks the screen
   */
  @Action(ALockScreen)
  public lockScreen: () => ALockScreen;

  /**
   * Logouts current user
   */
  @Action(ALogout)
  public logout: () => ALogout;

  /**
   * Sleeps computer display
   */
  @Action(ASleepDisplay)
  public sleepDisplay: () => ASleepDisplay;

  /**
   * Sleeps computer
   */
  @Action(ASleepComputer)
  public sleepComputer: () => ASleepComputer;

  /**
   * Restarts BetterTouchTool
   */
  @Action(ARestartBTT)
  public restart: () => ARestartBTT;

  /**
   * Shows system wide notification. Keep in mind that it's presence depends on the DnD state in the system.
   */
  @Action(AShowNotification)
  public showNotification: () => AShowNotification;

  /**
   * Quits BetterTouchTool
   */
  @Action(AQuitBTT)
  public quit: () => AQuitBTT;
}
