import { EActions } from 'types/enum';
import { BaseAction } from 'common/action';

/**
 * This action is responsible for starting siri
 */
export default class AStartSiri extends BaseAction { 
  protected id: EActions = EActions.START_SIRI;
}