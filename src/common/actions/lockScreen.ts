import { EActions } from '../../types/enum';
import { BaseAction } from '../../abstract/base-action';

/**
 * This action is responsible for locking the screen of your Mac
 */
export default class ALockScreen extends BaseAction { 
  protected id: EActions = EActions.LOCK_SCREEN;
}