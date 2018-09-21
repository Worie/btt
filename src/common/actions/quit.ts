import { EActions } from '../../types/enum';
import { BaseAction } from '../../abstract/base-action';

/**
 * This action is responsible for quitting the BetterTouchTool completely
 */
export default class AQuitBTT extends BaseAction {
  protected id: EActions = EActions.QUIT_BTT;
}