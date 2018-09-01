import * as Types from '../../../types';
import { Action } from '../../common/action';

/**
 * This action will delay any other action that'd be performed in BetterTouchTool
 * This seems to be synchronous, blocking, so use with caution.
 */
export default class ADelayNextAction extends Action {
  protected id: number = Types.ACTION.DELAY_NEXT_ACTION;
  
  /**
   * Returns a json of the current action. 
   * url and invoke properties of this class depend on this
   */
  public get data(): any {
    const timeout: number = this.arguments[0];

    return {
      "BTTDelayNextActionBy" : String(timeout / 1000),
    };
  }
}