import { EActions } from 'types/enum';
import { BaseAction } from 'common/action';

/**
 * This action will delay any other action that'd be performed in BetterTouchTool
 * This seems to be synchronous, blocking, so use with caution.
 */
export default class ADelayNextAction extends BaseAction {
  protected id: EActions = EActions.DELAY_NEXT_ACTION;
  
  public get data(): any {
    const timeout: number = this.arguments[0];

    return {
      "BTTDelayNextActionBy" : String(timeout / 1000),
    };
  }
}