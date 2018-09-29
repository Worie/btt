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

// get predefined widget instance
const widget = btt.Widget.get({
  // uuid of the widget that we'll be working on
  uuid: '07CA71DD-A3F9-4CF0-8340-9285373399EC',
  
  // you can provide default callback that'll be invoked
  // on .update() method.
  default: () => {
    return {
      text: new Date().toLocaleTimeString(),
      background_color: '0,0,0,1'
    };
  }
});

// update the widget contents every second
setInterval(() => {
  widget.update();
}, 1000);

// you could also create a new widget on the fly, in the runtime!
const widgetPromise = btt.Widget.create({
  name: 'Touchbar widget name',
  mode: 'node',
  // if you use the package on the frontend, you may need to provide path option manually
  // path: '/Users/Worie/.nvm/versions/node/v9.2.0/bin/node'
  alwaysShow: false,
  script: `console.log('Hello world!')`,
  appearance: {
    iconHeight : 22,
    iconWidth : 22,
    padding : -5,
    freeSpaceAfterButton : 5.000000, 
    buttonColor : "0.000000, 0.000000, 0.000000, 255.000000",
    alternateBackgroundColor : "128.829533, 128.829533, 128.829533, 255.000000"
  },
});

// now you can update it as you did previously
widgetPromise.then(async (widget) => {
  setInterval(() => {
    widget.update({
      text: `${new Date()}`,
    });  
  }, 1000);
})