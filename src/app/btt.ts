import { FTrigger } from '../common/trigger';
import { FWidget } from '../common/widget';
import VariableStore from '../common/state';
import * as _ from 'lodash';
import ActionInvoker from '../abstract/action-invoker';
import Chain from './chain';

import * as Initializer from '../types/initializers';
import * as Types from '../types/types';

import CommonUtils from '../common/util';

import EventManager from '../common/events';

// decorator for creating event related methods
import { EventMethod } from '../common/decorators';

/**
 * Class used to manage the BTT webserver 
 * @constructor IBTTConfig
 */
export class Btt extends ActionInvoker {
  // state, manages BTT variables
  public state: VariableStore;

  // stores Trigger factory
  public Trigger: FTrigger;

  // stores Widget factory
  public Widget: FWidget;

  // stores the config from the constructor
  private config: Types.AppConfig; 

  // event manager
  private event: EventManager;

  /**
   * Creates BTT instance which communicates with BetterTouchTool built in webserver
   */
  constructor(config: Types.AppConfig) {
    super();
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
    data: Types.BttPayload,
  ): Promise<any> {
    return CommonUtils.callBetterTouchTool(action, data, this.config);
  }

  /**
   * Allows to create a queue of actions, and just then invoke them
   */
  public invokeChain() {
    return new Chain(this.config);
  }

  /** Events Management */

  /**
   * Creates actual event listener that'll be run upon certain event type detection.
   * The code will be invoked in btt-node-server, and this method is dependand on this project
   * 
   * Keep in mind that this is persisent - it'll exist until you manually delete it.
   * 
   * @param eventType event type of specific action (for example, oneFingerForceClick)
   * @param cb callback function that'll be invoked upon event detection
   */
  @EventMethod('addEventListener')
  public addEventListener: Initializer.EventMethod;

  /**
   * Removes previously created event listener
   * 
   * @param eventType event type of specific action (for example, oneFingerForceClick)
   * @param cb callback function that'll be invoked upon event detection
   */
  @EventMethod('removeEventListener')
  public removeEventListener: Initializer.EventMethod;

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
  @EventMethod('addTriggerAction')
  public addTriggerAction: Initializer.EventMethod;

  /**
   * Removes a trigger of specified ID from the BetterTouchTool
   * 
   * @param eventType event type of specific action (for example, oneFingerForceClick)
   * @param cb a callback that was intended to run
   */
  @EventMethod('removeTriggerAction')
  public removeTriggerAction: Initializer.EventMethod;

  /** Actions */

  /**
   * Sends shortcut to txhe application. Some apps need to have focus so they can recieve shortcuts.
   * 
   * @param shortcut key identifiers separated by space
   * @param applicationPath absolute path pointing to the app which should recieve shortcut
   * @param applicationPath required for BTT to recognize the app, whithin browser env must be provided manually
   */
  public sendShortcut: Initializer.SendShortcut;

  /**
   * Executes passed nodejs script. Requires manual specificying of node executable binary if used on frontend
   * 
   * @param code a code to run
   */
  public executeScript: Initializer.ExecuteScript;

  /**
   * Toggles do not disturb mode
   */
  public toggleDnD: Initializer.ToggleDnD;

  /**
   * Toggles do not disturb mode
   */
  public toggleTrueTone: Initializer.ToggleTrueTone;
  
  /**
   * Toggles night shift
   */
  public toggleNightShift: Initializer.ToggleNightShift;

  /**
   * Triggers system wide keyboard shortcut
   * @param shortcut key identifiers separated by space
   */
  public triggerShortcut: Initializer.TriggerShortcut;

  /**
   * Shows HUD with given config
   */
  public showHUD: Initializer.ShowHUD;

  /**
   * Sends / Types / Inserts / Pastes custom text
   */
  public sendText: Initializer.SendText;

  /**
   * Triggers a haptic response. Takes a number as a param due to BTT lack of information
   * which ID represents which mode, in order to know what value represents what open BTT and map 
   * the order of selects options in config of "Perform Haptic Feedback on Trackpad" action
   * 
   * @param hapticMode a number representing each mode.
   */
  public hapticFeedback: Initializer.HapticFeedback;

  /**
   * Open an application on the given path
   */
  public launchApplication: Initializer.LaunchApplication;

  /**
   * Toggles the visibility of given application
   */
  public toggleApplication: Initializer.ToggleApplication;

  /**
   * Toggles the mute state in the system
   */
  public mute: Initializer.Mute;

  /**
   * Starts Siri
   */
  public startSiri: Initializer.StartSiri;

  /**
   * Toggles the BetterTouchTool gesture recognition
   */
  public toggle: Initializer.ToggleBTT;

  /**
   * Delays the next action. For most cases manually managing the execution of actions in JavaScript
   * should be sufficient - using this will block any new action that BTT will recieve
   * 
   * @param timeout - time in miliseconds during any action execution will be delayed
   */
  public delayNextAction: Initializer.DelayNextAction;

  /**
   * Moves mouse to specified position
   */
  public moveMouse: Initializer.MoveMouse;

  /**
   * Toggles the mouse speed between a regular and speeded up one
   */
  public toggleMouseSpeed: Initializer.ToggleMouseSpeed;

  /**
   * Toggles mouse cursor visibility
   */
  public toggleMouseCursor: Initializer.ToggleMouseCursor;

  /**
   * Toggles between the big and regular mouse cursor size
   */
  public toggleMouseSize: Initializer.ToggleMouseSize;

  /**
   * Toggles the system dark mode 
   */
  public toggleDarkMode: Initializer.ToggleDarkMode;

  /**
   * Opens a web view
   */
  public showWebView: Initializer.ShowWebView;

  /**
   * Saves selected text to variable selected_text
   * This can be later retrieved via btt.state.get('selected_text')
   */
  public saveSelectedText: Initializer.SaveSelectedText;

  /**
   * Locks the screen
   */
  public lockScreen: Initializer.LockScreen;

  /**
   * Logouts current user
   */
  public logout: Initializer.Logout;

  /**
   * Sleeps computer display
   */
  public sleepDisplay: Initializer.SleepDisplay;

  /**
   * Sleeps computer
   */
  public sleepComputer: Initializer.SleepComputer;

  /**
   * Restarts BetterTouchTool
   */
  public restart: Initializer.RestartBTT;

  /**
   * Shows system wide notification. Keep in mind that it's presence depends on the DnD state in the system.
   */
  public showNotification: Initializer.ShowNotification;

  /**
   * Quits BetterTouchTool
   */
  public quit: Initializer.QuitBTT;
}