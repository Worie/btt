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

// get the action you need, for example triggerShortcut
const moveSpaceRightAction = btt.triggerShortcut('ctrl+right');

// each action returns an object with json, url and invoke method
console.log(`\nmoveSpaceRightAction.url: ${moveSpaceRightAction.url}`);
console.log(`\nmoveSpaceRightAction.json: ${JSON.stringify(moveSpaceRightAction.json)}`);
console.log(`\nmoveSpaceRightAction.invoke(): Promise<void>`);
