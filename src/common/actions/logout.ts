import { EActions } from 'types/enum';
import { BaseAction } from 'common/action';

/**
 * This action is responsible for logging out the current user
 */
export default class ALogout extends BaseAction { 
  protected id: EActions = EActions.LOGOUT;
}