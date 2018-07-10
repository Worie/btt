// @TODO: update example

import { BTT } from 'btt';

// initialize main BTT instance
const btt = new BTT({
  domain: '127.0.0.1',
  port: '64472',
  protocol: 'http',
});

// get existing touch bar widget
const touchBarWidget = btt.Widget({
  // uuid of the tb widget, you can PPM it and copy from within BTT
  uuid: 'YOUR-LONG-UUID-STRING',
  // default value used for updating the widget contents without arguments
  default: () => {
    return {
      // the text that you want to set to your widget
      text: 'Default: '+ new Date(),
    };
  },
});

// will use the defaults passed during widget initialization within node
// and will show the current date with `Default: prefix`
setInterval(() => {
  widget.update();
}, 1000);

// you can also refresh the widget contents:
widget.refresh();

// and "click" it 
widget.click();

// get existing trigger: 
const trigger = btt.Trigger({
  uuid: 'YOUR-LONG-UUID-STRING',
});

// create a new trigger with given json: 
btt.Trigger.new({});

// update existing trigger contents
trigger.update(data);

// calls predefined trigger
trigger.invoke();

// there are also lots of predefinedActions on btt instance:  
btt.triggerShortcut('cmd+space'); // will open spotlight and return a promise
btt.sendShortuct('cmd+i', '/Applications/Messages.app'); // will send cmd+i shortcut to given app
btt.showWebView(config); // will open a web view
btt.hapticFeedback(mode); // will trigger a haptic response
btt.restart(); // will restart the BetterTouchTool

// And many, many more. For full feature set please look at BetterTouchTool website

// you can also chain the actions together to make sure that they're triggerend sequentially
btt.triggerShortuct('cmd+space')
  .then(() => btt.sendText({ text: 'Hello world!' }))
  .then(() => btt.hapticFeedback(15))
  .then(() => btt.sleepDisplay())

// and surely you can use it inside async function, because every action returns a promise
(async () => {
  await btt.triggerShortcut('cmd+space');
  await btt.sendText({ text: 'Hello world!' })
  await btt.hapticFeedback(15);
  await btt.showHUD({
    title: 'alright!',
    details: 'all done',
  })
})();

// creates a URL which is going to be called - this function communicates with BetterTouchTool itself
// will fetch protocol://domain:port/trigger_named/?trigger_name=myTrigger and return a promise of that request
btt.do('trigger_named', { trigger_name: 'myTrigger' });

// keep in mind that even successful promises will resolve to void because BTT server sends empty response for the requests
// that trigger actions / manages widgets etc

// you can use btt.do if the action you want to invoke is not predefined in this library yet (PRs always welcome!)
