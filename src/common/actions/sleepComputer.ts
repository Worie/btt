import * as Types from '../../../types';
import { Action } from '../../common/action';

/**
 * This action is responsible for sleeping the mac
 */
export default class ASleepComputer extends Action { 
  // reference name
  public static alias: string = 'sleepComputer';

  /**
   * Returns a json of the current action. 
   * url and invoke properties of this class depend on this
   */
  public get json(): any {
    return {
      "BTTPredefinedActionType" : Types.ACTION.SLEEP_COMPUTER,
      "BTTEnabled2" : 1,
      "BTTEnabled" : 1,
    };
  }
}