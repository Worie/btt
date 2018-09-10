import { EActions } from 'types/enum';
import { BaseAction } from 'common/action';

/**
 * This action is responsible for disabling / enabling BTT. Does not affect this library or webserver
 */
export default class AToggleBTT extends BaseAction { 
  protected id: EActions = EActions.TOGGLE_BTT;
}