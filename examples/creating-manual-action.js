// you need to have widget of specific ID in your current BetterTouchTool
// if you don't want to do it manually, you can get it from https://share.folivora.ai/uploadedPresetDetails/55
// (click direct import to btt);

// you could import it like this if you're using TS
// import { Btt } from 'btt';

// or like that, if you're using requirejs
// const Btt = require('btt').Btt;

// for the sake of the example, we're importing this package built code
const Btt = require('../dist/index').Btt;

// connect to some btt webserver that has the widget defined
const btt = new Btt({
  domain: '127.0.0.1',
  port: '64472',
  protocol: 'http',
  sharedKey: 'sBP2fYAo2Fu8TdfzhLpwdUm'
});

// action copied directly from BetterTouchTool, you can surely adjust it manually if needed.
const actionJSON = {
  "BTTTriggerType" : -1,
  "BTTTriggerClass" : "BTTTriggerTypeTouchpadAll",
  "BTTPredefinedActionType" : 254,
  "BTTPredefinedActionName" : "Show HUD Overlay",
  "BTTHUDActionConfiguration" : "{\"BTTActionHUDDetail\":\"It works!\",\"BTTActionHUDTitle\":\"Whoa!\",\"BTTActionHUDDuration\":0.90000000000000002,\"BTTActionHUDBackground\":\"255.000000, 147.416814, 0.000000, 255.000000\",\"BTTActionHUDSlideDirection\":3}",
  "BTTEnabled2" : 1,
  "BTTUUID" : "EF3A5C46-A2AE-4C9C-AF69-B8D6C492E210",
  "BTTEnabled" : 1,
  "BTTOrder" : 22
};

// trigger the action or refer to official BetterTouchTools webserver documentation
btt.do('trigger_action', {
  json: JSON.stringify(actionJSON)
});