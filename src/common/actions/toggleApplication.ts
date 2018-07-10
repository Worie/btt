import * as Types from '../../../types';
import { Action } from '../../common/action';
import * as DetectNode from 'detect-node';

let getMdlsName: any;

if (DetectNode) {
  getMdlsName = require('../../backend/util').getMdlsName;
} else {
  getMdlsName = (): null => undefined;
}

/**
 * This action is responsible for toggling the visibility of specified application
 */
export default class AToggleApplication extends Action { 
  // reference name
  public static alias: string = 'toggleApplication';

  /**
   * Returns a json of the current action. 
   * url and invoke properties of this class depend on this
   */
  public get json(): any {
    const applicationPath: string = this.arguments[1];
    const mdlsName: string = this.arguments[2];

    const mdlsValue: string = getMdlsName(applicationPath) || mdlsName;
      
    if (!mdlsValue) {
      console.error(`Sorry, you'll have to manually provide mdls name of the app for this action to work`);
      return;
    }

    return {
      "BTTPredefinedActionType" : Types.ACTION.TOGGLE_APPLICATION,
      "BTTAppToShowOrHide": mdlsValue,
      "BTTEnabled2" : 1,
      "BTTEnabled" : 1,
    };
  }
}