import { EActions } from 'types/enum';
import { BaseAction } from 'common/action';

/**
 * This action is responsible for toggling the mute state of your Mac
 */
export default class AMute extends BaseAction { 
  protected id: EActions = EActions.MUTE;
}