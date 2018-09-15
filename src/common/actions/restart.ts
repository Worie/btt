import { EActions } from '../../types/enum';
import { BaseAction } from '../action';

/**
 * This action is responsible for restarting BTT
 */
export default class ARestartBTT extends BaseAction { 
  protected id: EActions = EActions.RESTART_BTT;
}
