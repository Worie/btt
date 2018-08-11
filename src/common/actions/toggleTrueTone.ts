import * as Types from '../../../types';
import { Action } from '../../common/action';

/**
 * This action will toggle true tone. You OS needs to support that feature.
 */
export default class AToggleTrueTone extends Action { 
  // reference name
  public static alias: string = 'toggleTrueTone';

  /**
   * Returns a json of the current action. 
   * url and invoke properties of this class depend on this
   */
  public get json(): any {
    return {
      "BTTPredefinedActionType" : Types.ACTION.TOGGLE_TRUE_TONE,
      "BTTEnabled2" : 1,
      "BTTEnabled" : 1,
    };
  }
}