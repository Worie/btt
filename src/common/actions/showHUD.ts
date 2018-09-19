import { EActions } from '../../types/enum';
import { BaseAction } from '../../abstract/base-action';
import * as Types from '../../types/types';
import CommonUtils from '../util';


/**
 * This action is responsible for showing a BetterTouchTool HUD. 
 * The HUD cannot be blocked by do-not-disturb mode or anything and it cannot be closed - it'll fade out on its own
 */
export default class AShowHUD extends BaseAction {
  protected id: EActions = EActions.SHOW_HUD;

  public get data() {
    const config: Types.IShowHUDConfig = this.arguments[0];
    
    const { title, details, duration, background, direction } = config;
      
    // limit the duration to 10 seconds, and ignore negative values
    const reasonableDuration = Math.abs(Math.min(duration, 10));
  
    const BTTAdditionalConfig: any = {
      ActionHUDDetail: details,
      ActionHUDTitle: title,
      ActionHUDDuration: reasonableDuration || 0.8,
      ActionHUDBackground: background, 
      ActionHUDSlideDirection: direction,
    };
    
    const result: any = {
      HUDActionConfiguration : JSON.stringify(
        CommonUtils.translateObjectKeysToBttNotation(BTTAdditionalConfig)
      ),
    };
  
    return result;
  }
}