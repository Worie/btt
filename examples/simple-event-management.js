// you could import it like this if you're using TS
// import { Btt } from 'btt';

// or like that, if you're using requirejs
// const Btt = require('btt').Btt;

// for the sake of the example, we're importing this package built code
const Btt = require('../dist/index').Btt;

// connect to some btt webserver
const btt = new Btt({
  domain: '127.0.0.1',
  port: '64472',
  protocol: 'http',
  sharedKey: 'sBP2fYAo2Fu8TdfzhLpwdUm'
});

// create a 'callback' that'll be run once something happens.
// keep in mind that at this point this is the proper structure for the callback function (operating on ev.actions)
// don't create custom intervals withing this function - the callback is run only once, during first addEventListener call 
// for each script execution
const myCallback = (ev) => {
  // create a list of actions that we want to make upon some event
  const actionsToInvoke = [
    // show HUD with custom message
    btt.showHUD({
      title: 'Wow!',
      details: 'I triggered! 😍',
    }),
  ];
  
  // and push them to `actions` property in the event object.
  ev.actions.push(...actionsToInvoke);
};

// this will register a trigger in the BetterTouchTool.
// Keep in mind, that it'll be persistent - meaning that if you don't delete it manually or 
// via removeEventListener, this will be still in BetterTouchTool after you finish this script execution
btt.addTriggerAction('threeFingerDoubleTap', myCallback);

// you can also register the key combos on the fly
btt.addTriggerAction('cmd+shift+t', myCallback);

// setting location of alt, ctrl shift or command is also possible by adding l/r prefixes
btt.addTriggerAction('ralt+b', myCallback);

// remove the event listener after some timeout
setTimeout(() => {
  btt.removeTriggerAction('threeFingerDoubleTap', myCallback);
  btt.removeTriggerAction('cmd+shift+t', myCallback);
  btt.removeTriggerAction('ralt+b', myCallback);
  console.log('Listener removed.');
}, 20000);

console.log('Alright! This event listener will auto-remove itself after 20s. Use threeFingerDoubleTap, cmd+shift+t or right alt + b gestures!');