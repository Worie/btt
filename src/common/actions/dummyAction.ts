import { BaseAction } from '../../abstract/base-action';
import { EActions } from '../../types/enum';
import * as Types from '../../types/types';

/**
 * This is a dummy action, used to silently 
 * quit when someone requested blacklisted action
 */
export default class ADummyAction extends BaseAction { 
  protected id: EActions = EActions.DUMMY;
  public name: string;

  constructor(config: Types.IBTTConfig, ...args: any[]) {
    super(config, ...args);
    this.name = this.arguments[0];
  }
}