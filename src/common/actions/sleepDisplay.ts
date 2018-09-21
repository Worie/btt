import { EActions } from '../../types/enum';
import { BaseAction } from '../../abstract/base-action';

/**
 * This action is responsible for sleeping the display
 */
export default class ASleepDisplay extends BaseAction { 
  protected id: EActions = EActions.SLEEP_DISPLAY;
}