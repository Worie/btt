import { FTrigger } from './common/trigger';
import { FWidget } from './common/widget';
import * as State from './common/state';
import * as Types from '../types';
import * as CommonUtils from './common/util';
import { Action } from './common/action';

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


/**
 * Class used to manage the BTT webserver 
 * @constructor IBTTConfig
 */
export class Btt {
  // state, manages BTT variables
  public state: Types.IState;

  // stores Trigger factory
  public Trigger: FTrigger;

  // stores Widget factory
  public Widget: FWidget;

  // stores the config from the constructor
  private config: Types.IBTTConfig;

  // namespace for uuid/v5
  private static namespace: string = '87a84aef-11fe-4dce-8d00-429cea46f345';

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
    this.state = State.init(config);
  }

  /**
   * Adds event listener to BTT. Keep in mind this is persistent, so if you call this method twice, 
   * two entries will be added to BTT. Closing the browser / node process won't make the listeners die
   * @param eventType string, created from action enum identifier
   * @param cb IEventCallback
   */
  public addEventListener(eventType: string, cb: (e: Types.IEventCallback) => {}): void {
    const actions: Action[] = [];
    let comment: string = '';

    const event: Types.IEventCallback = {
      actions,
      comment,
    };

    cb(event);

    // do something with those actions and eventType and the event that we got
    const batchAction: any = CommonUtils.buildActionSequence(event.actions);

    const listenerJSON: any = CommonUtils.buildTriggerAction(eventType, batchAction, {
      comment: event.comment,
    }); 

    // set up ids
    const listenerUuid: string = CommonUtils.generateUuidForString(
      `${eventType}:${String(cb)}`,
      Btt.namespace
    );

    listenerJSON['BTTUUID'] = listenerUuid;
    listenerJSON['BTTAdditionalActions'] = listenerJSON['BTTAdditionalActions'].map((action: any) => {
      return {
        ...action,
        "BTTUUID": CommonUtils.generateUuidForString(JSON.stringify(action), listenerUuid),
      };
    });

    // end set up ids

    this.do('add_new_trigger', {
      json: JSON.stringify(listenerJSON)
    });
  }


  /**
   * Removes event listener
   * @param eventType string, created from action enum identifier
   * @param cb IEventCallback
   */
  public removeEventListener(eventType: string, cb: (e: any) => {}): void {    
    // get the id from event type, callback and everything
    const triggerID: string = CommonUtils.generateUuidForString(
      `${eventType}:${String(cb)}`,
      Btt.namespace
    );
  
    CommonUtils.deleteTrigger(triggerID);
  }

  /**
   * Sends a request to real BTT built in webserver with given data translated as GET query params
   */
  public do(action: string, data: Record<string, any>): Promise<any> {
    return CommonUtils.makeAction(action, data, this.config);
  }

  /** ACTIONS */

  /**
   * Sends shortcut to txhe application. Some apps need to have focus so they can recieve shortcuts.
   * 
   * @param shortcut key identifiers separated by space
   * @param applicationPath absolute path pointing to the app which should recieve shortcut
   * @param applicationPath required for BTT to recognize the app, whithin browser env must be provided manually
   */
  public sendShortcut(
    shortcut: string,
    applicationPath: string,
    mdlsName?: string,
  ) {
    return new ASendShortcut(
      this.config,
      shortcut,
      applicationPath,
      mdlsName,
    );
  }

  /**
   * Toggles do not disturb mode
   */
  public toggleDnD() {
    return new AToggleDnD(this.config);
  }

  /**
   * Toggles night shift
   */
  public toggleNightShift() {
    return new AToggleNightShift(this.config);
  }

  /**
   * Triggers system wide keyboard shortcut
   * @param shortcut key identifiers separated by space
   */
  public triggerShortcut(shortcut: string) {
    return new ATriggerShortcut(this.config, shortcut);
  }

  /**
   * Shows HUD with given config
   */
  public showHUD(config: Types.IShowHUDConfig) {
    return new AShowHUD(this.config, config);
  }

  /**
   * Sends / Types / Inserts / Pastes custom text
   */
  public sendText(config: Types.ISendTextConfig) {
    return new ASendText(this.config, config);
  }

  /**
   * Triggers a haptic response. Takes a number as a param due to BTT lack of information
   * which ID represents which mode, in order to know what value represents what open BTT and map 
   * the order of selects options in config of "Perform Haptic Feedback on Trackpad" action
   * 
   * @param hapticMode a number representing each mode.
   */
  public hapticFeedback(hapticMode: number) {
    return new AHapticFeedback(this.config, hapticMode);
  }

  /**
   * Open an application on the given path
   */
  public launchApplication(applicationPath: string) {
    return new ALaunchApplication(this.config, applicationPath);
  }

  /**
   * Toggles the visibility of given application
   */
  public toggleApplication(applicationPath: string) {
    return new AToggleApplication(this.config, applicationPath);
  }

  /**
   * Toggles the mute state in the system
   */
  public mute() {
    return new AMute(this.config);
  }

  /**
   * Starts Siri
   */
  public startSiri() {
    return new AStartSiri(this.config);
  }

  /**
   * Toggles the BetterTouchTool gesture recognition
   */
  public toggle() {
    return new AToggleBTT(this.config);
  }

  /**
   * Delays the next action. For most cases manually managing the execution of actions in JavaScript
   * should be sufficient - this will block any new action that BTT will recieve by the given am
   * 
   * @param timeout - time in miliseconds during any action execution will be delayed
   */
  public delayNextAction(timeout: number) {
    return new ADelayNextAction(this.config, timeout);
  }

  /**
   * Moves mouse to specified position
   */
  public moveMouse(config: Types.IMoveMouseConfig) {
    return new AMoveMouse(this.config, config);
  }

  /**
   * Toggles the mouse speed between a regular and speeded up one
   */
  public toggleMouseSpeed() {
    return new AToggleMouseSpeed(this.config);
  }

  /**
   * Toggles mouse cursor visibility
   */
  public toggleMouseCursor() {
    return new AToggleMouseCursor(this.config);
  }

  /**
   * Toggles between the big and regular mouse cursor size
   */
  public toggleMouseSize() {
    return new AToggleMouseSize(this.config);
  }

  /**
   * Toggles the system dark mode 
   */
  public toggleDarkMode() {
    return new AToggleDarkMode(this.config);
  }

  /**
   * Opens a web view
   */
  public showWebView(config: Types.IShowWebViewConfig) {
    return new AShowWebView(this.config, config);
  }

  /**
   * Locks the screen
   */
  public lockScreen() {
    return new ALockScreen(this.config);
  }

  /**
   * Logouts current user
   */
  public logout() {
    return new ALogout(this.config);
  }

  /**
   * Sleeps computer display
   */
  public sleepDisplay() {
    return new ASleepDisplay(this.config);
  }

  /**
   * Sleeps computer
   */
  public sleepComputer() {
    return new ASleepComputer(this.config);
  }

  /**
   * Restarts BetterTouchTool
   */
  public restart() {
    return new ARestartBTT(this.config);
  }

  /**
   * Quits BetterTouchTool
   */
  public quit() {
    return new AQuitBTT(this.config);
  }
}
