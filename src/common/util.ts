import * as DetectNode from 'detect-node';
import Utilities from '../abstract/utils';
import BackendUtils from '../backend/utils';
import FrontendUtilities from '../frontend/utils';

let Utils: Utilities;

if (DetectNode) {
  Utils = new BackendUtils();
} else {
  Utils = new FrontendUtilities();
}

export default Utils;