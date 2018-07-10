import * as Types from '../../../types';
import { Action } from '../../common/action';

/**
 * This action is responsible for sleeping the display
 */
export default class ASleepDisplay extends Action { 
  // reference name
  public static alias: string = 'sleepDisplay';

  /**
   * Returns a json of the current action. 
   * url and invoke properties of this class depend on this
   */
  public get json(): any {
    return {
      "BTTPredefinedActionType" : Types.ACTION.SLEEP_DISPLAY,
      "BTTEnabled2" : 1,
      "BTTEnabled" : 1,
    };
  }
}