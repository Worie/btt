import { EActions } from '../../types/enum';
import { BaseAction } from '../../abstract/base-action';

/**
 * This action is responsible for logging out the current user
 */
export default class ALogout extends BaseAction { 
  protected id: EActions = EActions.LOGOUT;
}