import AHapticFeedback from '../common/actions/hapticFeedback';
import ASendText from '../common/actions/sendText';
import ASaveSelectedText from '../common/actions/saveSelectedText';
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

// decorator for creating actions
import { Action } from '../common/decorators';

export default abstract class ActionInvoker {  
  /**
   * Sends shortcut to txhe application. Some apps need to have focus so they can recieve shortcuts.
   * 
   * @param shortcut key identifiers separated by space
   * @param applicationPath absolute path pointing to the app which should recieve shortcut
   * @param applicationPath required for BTT to recognize the app, whithin browser env must be provided manually
   */
  @Action(ASendShortcut)
  public abstract sendShortcut: any;

  /**
   * Executes passed nodejs script. Requires manual specificying of node executable binary if used on frontend
   * 
   * @param code a code to run
   */
  @Action(AExecuteScript)
  public abstract executeScript: any;

  /**
   * Toggles do not disturb mode
   */
  @Action(AToggleDnD)
  public abstract toggleDnD: any;

  /**
   * Toggles do not disturb mode
   */
  @Action(AToggleTrueTone)
  public abstract toggleTrueTone: any;
  
  /**
   * Toggles night shift
   */
  @Action(AToggleNightShift)
  public abstract toggleNightShift: any;

  /**
   * Triggers system wide keyboard shortcut
   * @param shortcut key identifiers separated by space
   */
  @Action(ATriggerShortcut) 
  public abstract triggerShortcut: any;

  /**
   * Shows HUD with given config
   */
  @Action(AShowHUD)
  public abstract showHUD: any;

  /**
   * Sends / Types / Inserts / Pastes custom text
   */
  @Action(ASendText)
  public abstract sendText: any;

  /**
   * Triggers a haptic response. Takes a number as a param due to BTT lack of information
   * which ID represents which mode, in order to know what value represents what open BTT and map 
   * the order of selects options in config of "Perform Haptic Feedback on Trackpad" action
   * 
   * @param hapticMode a number representing each mode.
   */
  @Action(AHapticFeedback)
  public abstract hapticFeedback: any;

  /**
   * Open an application on the given path
   */
  @Action(ALaunchApplication)
  public abstract launchApplication: any;

  /**
   * Toggles the visibility of given application
   */
  @Action(AToggleApplication)
  public abstract toggleApplication: any;

  /**
   * Toggles the mute state in the system
   */
  @Action(AMute)
  public abstract mute: any;

  /**
   * Starts Siri
   */
  @Action(AStartSiri)
  public abstract startSiri: any;

  /**
   * Toggles the BetterTouchTool gesture recognition
   */
  @Action(AToggleBTT)
  public abstract toggle: any;

  /**
   * Delays the next action. For most cases manually managing the execution of actions in JavaScript
   * should be sufficient - using this will block any new action that BTT will recieve
   * 
   * @param timeout - time in miliseconds during any action execution will be delayed
   */
  @Action(ADelayNextAction)
  public abstract delayNextAction: any;

  /**
   * Moves mouse to specified position
   */
  @Action(AMoveMouse)
  public abstract moveMouse: any;

  /**
   * Toggles the mouse speed between a regular and speeded up one
   */
  @Action(AToggleMouseSpeed)
  public abstract toggleMouseSpeed: any;

  /**
   * Toggles mouse cursor visibility
   */
  @Action(AToggleMouseCursor)
  public abstract toggleMouseCursor: any;

  /**
   * Toggles between the big and regular mouse cursor size
   */
  @Action(AToggleMouseSize)
  public abstract toggleMouseSize: any;

  /**
   * Toggles the system dark mode 
   */
  @Action(AToggleDarkMode)
  public abstract toggleDarkMode: any;

  /**
   * Opens a web view
   */
  @Action(AShowWebView)
  public abstract showWebView: any;

  /**
   * Saves selected text to variable selected_text
   * This can be later retrieved via (await btt.state.get('selected_text'))
   */
  @Action(ASaveSelectedText)
  public abstract saveSelectedText: any;

  /**
   * Locks the screen
   */
  @Action(ALockScreen)
  public abstract lockScreen: any;

  /**
   * Logouts current user
   */
  @Action(ALogout)
  public abstract logout: any;

  /**
   * Sleeps computer display
   */
  @Action(ASleepDisplay)
  public abstract sleepDisplay: any;

  /**
   * Sleeps computer
   */
  @Action(ASleepComputer)
  public abstract sleepComputer: any;

  /**
   * Restarts BetterTouchTool
   */
  @Action(ARestartBTT)
  public abstract restart: any;

  /**
   * Shows system wide notification. Keep in mind that it's presence depends on the DnD state in the system.
   */
  @Action(AShowNotification)
  public abstract showNotification: any;

  /**
   * Quits BetterTouchTool
   */
  @Action(AQuitBTT)
  public abstract quit: any;

  /**
   * @TODO: Implement action that'll allow to manage "detection groups"
   */
}