import * as DetectNode from 'detect-node';
import Utilities from '../abstract/utils';

let Utils: Utilities;

if (DetectNode) {
  const BackendUtils = require('../backend/utils').default;
  Utils = new BackendUtils();
} else {
  const FrontendUtilities = require('../frontend/utils').default;
  Utils = new FrontendUtilities();
}

export default Utils;
