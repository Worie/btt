import { EActions } from '../../types/enum';
import { BaseAction } from '../action';

/**
 * This action is responsible for sleeping the mac
 */
export default class ASleepComputer extends BaseAction { 
  protected id: EActions = EActions.SLEEP_COMPUTER;
}