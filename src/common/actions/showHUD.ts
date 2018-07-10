import * as Types from '../../../types';
import { Action } from '../../common/action';

/**
 * This action is responsible for showing a BetterTouchTool HUD. 
 * The HUD cannot be blocked by do-not-disturb mode or anything and it cannot be closed - it'll fade out on its own
 */
export default class AShowHUD extends Action { 
  // reference name
  public static alias: string = 'showHUD';

  /**
   * Returns a json of the current action. 
   * url and invoke properties of this class depend on this
   */
  public get json(): any {
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
      "BTTPredefinedActionType" : Types.ACTION.SHOW_HUD,
      "BTTHUDActionConfiguration" : JSON.stringify(BTTAdditionalConfig),
      "BTTEnabled2" : 1,
      "BTTEnabled" : 1,
    };
  
    return result;
  }
}