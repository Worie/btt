import { EActions } from '../../types/enum';
import { BaseAction } from '../action';
import * as Types from '../../types/types';

/**
 * This action is responsible for showing a BetterTouchTool HUD. 
 * The HUD cannot be blocked by do-not-disturb mode or anything and it cannot be closed - it'll fade out on its own
 */
export default class AShowHUD extends BaseAction {
  protected id: EActions = EActions.SHOW_HUD;

  public get data(): any {
    const config: Types.IShowHUDConfig = this.arguments[0];
    
    const { title, details, duration, background, direction } = config;
      
    // limit the duration to 10 seconds, and ignore negative values
    const reasonableDuration = Math.abs(Math.min(duration, 10));
  
    const BTTAdditionalConfig: any = {
      "BTTActionHUDDetail": details,
      "BTTActionHUDTitle": title,
      "BTTActionHUDDuration": reasonableDuration || 0.8,
      "BTTActionHUDBackground": background, 
      "BTTActionHUDSlideDirection": direction,
    };
    
    const result: any = {
      "BTTHUDActionConfiguration" : JSON.stringify(BTTAdditionalConfig),
    };
  
    return result;
  }
}