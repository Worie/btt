import * as _ from 'lodash';
import ActionInvoker from '../abstract/action-invoker';

import * as Initializer from '../types/initializers';
import * as Types from '../types/types';

import CommonUtils from '../common/util';

// decorator for creating actions
import { Chainable } from '../common/decorators';

export default class Chain extends ActionInvoker {
  /**
   * Sends shortcut to txhe application. Some apps need to have focus so they can recieve shortcuts.
   *
   * @param shortcut key identifiers separated by space
   * @param applicationPath absolute path pointing to the app which should recieve shortcut
   * @param applicationPath required for BTT to recognize the app, whithin browser env must be provided manually
   */
  @Chainable()
  public sendShortcut: Initializer.ChainSendShortcut;

  /**
   * Executes passed nodejs script. Requires manual specificying of node executable binary if used on frontend
   *
   * @param code a code to run
   */
  @Chainable()
  public executeScript: Initializer.ChainExecuteScript;

  /**
   * Toggles do not disturb mode
   */
  @Chainable()
  public toggleDnD: Initializer.ChainToggleDnD;

  /**
   * Toggles do not disturb mode
   */
  @Chainable()
  public toggleTrueTone: Initializer.ChainToggleTrueTone;

  /**
   * Toggles night shift
   */
  @Chainable()
  public toggleNightShift: Initializer.ChainToggleNightShift;

  /**
   * Triggers system wide keyboard shortcut
   * @param shortcut key identifiers separated by space
   */
  @Chainable()
  public triggerShortcut: Initializer.ChainTriggerShortcut;

  /**
   * Shows HUD with given config
   */
  @Chainable()
  public showHUD: Initializer.ChainShowHUD;

  /**
   * Sends / Types / Inserts / Pastes custom text
   */
  @Chainable()
  public sendText: Initializer.ChainSendText;

  /**
   * Triggers a haptic response. Takes a number as a param due to BTT lack of information
   * which ID represents which mode, in order to know what value represents what open BTT and map
   * the order of selects options in config of "Perform Haptic Feedback on Trackpad" action
   *
   * @param hapticMode a number representing each mode.
   */
  @Chainable()
  public hapticFeedback: Initializer.ChainHapticFeedback;

  /**
   * Open an application on the given path
   */
  @Chainable()
  public launchApplication: Initializer.ChainLaunchApplication;

  /**
   * Toggles the visibility of given application
   */
  @Chainable()
  public toggleApplication: Initializer.ChainToggleApplication;

  /**
   * Toggles the mute state in the system
   */
  @Chainable()
  public mute: Initializer.ChainMute;

  /**
   * Starts Siri
   */
  @Chainable()
  public startSiri: Initializer.ChainStartSiri;

  /**
   * Delays the next action. For most cases manually managing the execution of actions in JavaScript
   * should be sufficient - using this will block any new action that BTT will recieve
   *
   * @param timeout - time in miliseconds during any action execution will be delayed
   */
  @Chainable()
  public delayNextAction: Initializer.ChainDelayNextAction;

  /**
   * Moves mouse to specified position
   */
  @Chainable()
  public moveMouse: Initializer.ChainMoveMouse;

  /**
   * Toggles the mouse speed between a regular and speeded up one
   */
  @Chainable()
  public toggleMouseSpeed: Initializer.ChainToggleMouseSpeed;

  /**
   * Toggles mouse cursor visibility
   */
  @Chainable()
  public toggleMouseCursor: Initializer.ChainToggleMouseCursor;

  /**
   * Toggles between the big and regular mouse cursor size
   */
  @Chainable()
  public toggleMouseSize: Initializer.ChainToggleMouseSize;

  /**
   * Toggles the system dark mode
   */
  @Chainable()
  public toggleDarkMode: Initializer.ChainToggleDarkMode;

  /**
   * Opens a web view
   */
  @Chainable()
  public showWebView: Initializer.ChainShowWebView;

  /**
   * Saves selected text to variable selected_text
   * This can be later retrieved via btt.state.get('selected_text')
   */
  @Chainable()
  public saveSelectedText: Initializer.ChainSaveSelectedText;

  /**
   * Locks the screen
   */
  @Chainable()
  public lockScreen: Initializer.ChainLockScreen;

  /**
   * Logouts current user
   */
  @Chainable()
  public logout: Initializer.ChainLogout;

  /**
   * Sleeps computer display
   */
  @Chainable()
  public sleepDisplay: Initializer.ChainSleepDisplay;

  /**
   * Sleeps computer
   */
  @Chainable()
  public sleepComputer: Initializer.ChainSleepComputer;

  /**
   * Shows system wide notification. Keep in mind that it's presence depends on the DnD state in the system.
   */
  @Chainable()
  public showNotification: Initializer.ChainShowNotification;

  /**
   * Quits BetterTouchTool
   */
  @Chainable()
  public quit: Initializer.ChainQuitBTT;

  /**
   * Toggles the BetterTouchTool gesture recognition
   */
  @Chainable()
  public toggle: Initializer.ChainToggleBTT;

  /**
   * Restarts BetterTouchTool
   */
  @Chainable()
  public restart: Initializer.ChainRestartBTT;
  private config: Types.AppConfig;

  // holds all entries ever passed to this chain
  private totalQueue: Types.ChainEntry[] = [];

  constructor(config: Types.AppConfig) {
    super();
    this.config = config;
  }

  /**
   * Allows to invoke previously prepared chain, returns promise
   */
  public async call(): Promise<Types.CallResult> {
    const startTime = CommonUtils.performanceNow() * 100;

    // set current queue to the total list
    const queue = _.cloneDeep(this.totalQueue);

    // complete the queue and get combined results
    const response = await this.runQueue(queue);

    // mark when the queue finished its execution
    const endTime = Number(CommonUtils.performanceNow().toFixed(3)) * 100;

    // check if status code of each call was successful, and only then consider it as success
    // @TODO: Find proper status code
    const status = response.every((r: Types.CallResult) => r.status === 200) ? 200 : null;

    // return nested call result
    return {
      value: response,
      status,
      time: endTime / 100 - startTime / 100,
    } as Types.CallResult;
  }

  /**
   * Clears the current chain
   */
  public clear() {
    this.totalQueue.length = 0;
    return this;
  }

  /**
   * Allows to delay the action execution from JavaScript side. Time in ms
   * @param timeout
   */
  public wait(timeout: number) {
    // adds a promise to queue that'll resolve after given timeout
    this.addToQueue(
      async () =>
        new Promise((res, rej) => {
          setTimeout(() => {
            res({
              value: null,
              status: 200,
              time: timeout,
              note: `Explicit timeout`,
            } as Types.CallResult);
          }, timeout);
        }),
    );

    // because this method is chainable, we're returning current instance
    return this;
  }

  /**
   * Recursive function that'll invoke the queue elements an remove them from list once resolved
   */
  private async runQueue(queue: Types.ChainEntry[], result: Types.CallResult[] = []): Promise<Types.CallResult[]> {
    // if queue is empty at this point, finish
    if (queue.length === 0) {
      return result;
    }

    // get the item that should be processed now
    const currentStep = queue[0];

    // invoke the current callback and wait for it to complete
    result.push(await currentStep.call(null));

    // remove the element from queue
    queue.shift();

    // proceed to next step
    return this.runQueue(queue, result);
  }

  /**
   * Allows to add new entries to queue
   * @param fn
   */
  private addToQueue(fn: () => Promise<any>) {
    this.totalQueue.push(fn);
  }
}
