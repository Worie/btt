import { EActions } from '../../types/enum';
import { BaseAction } from '../action';

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
export default class AToggleApplication extends BaseAction { 
  protected id: EActions = EActions.TOGGLE_APPLICATION;
  
  public get data(): any {
    const applicationPath: string = this.arguments[1];
    const mdlsName: string = this.arguments[2];

    const mdlsValue: string = getMdlsName(applicationPath) || mdlsName;
      
    if (!mdlsValue) {
      console.error(`Sorry, you'll have to manually provide mdls name of the app for this action to work`);
      return;
    }

    return {
      "BTTAppToShowOrHide": mdlsValue,
    };
  }
}