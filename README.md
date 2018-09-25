# btt
<p align="center"><img width="100" src="https://user-images.githubusercontent.com/6313514/42529852-d9c76ab0-847f-11e8-8d8c-323d1d995b2d.png" alt="Package logo"></p>

<p align="center">
  <img src="https://badge.fury.io/js/btt.svg" alt="Package version">
  <img src="https://snyk.io/test/github/worie/btt/badge.svg" alt="Vunerabilities"></p>
<p align="center">
  <a href="https://nodei.co/npm/btt/">
  <img src="https://nodei.co/npm/btt.png?downloads=true&downloadRank=true" alt="Vunerabilitiesn"></a>
</p><p align="center"><h2 align="center">Manage your BetterTouchTool in JavaScript, easly.
</h2></p>

## About 
This package is a handy wrapper over [BetterTouchTool](https://folivora.ai/) built in webserver API. (by [@Andreas Hegenberg](https://github.com/fifafu))

This package will allow you to automate you MacOS-running machine using JavaScript. You'll be able to:

* Toggle your do-not-disturb state
* Show a system notification
* Toggle Night Shift
* Sleep your computer after timeout
* Create your own **touchbar widgets**
* Feel a notification via **haptic engine**
* Use the content of your clipboard to be opened in specific url or application
* Create your own UIs "within system" using web view 
* Trigger a system wide keyboard shortcut
* Send a shortcut to specific application
* Show / Hide / Open / Quit specific applcation
* Move your mouse to specific position and click it
* Lock / Unlock your MacOS machine
* Integrate your flow with various APIs ...

*and anything else that BetterTouchTool or JavaScript specification will allow you to do!*

## Typings

This package provides it's own type definitions and can be run both on browser and nodejs environment.

## Requirements

This package depends on application [BetterTouchTool](https://folivora.ai/) in at least version v2.0.0, you need to have it installed and running before going anywhere further.

Then, please enable and configure webserver in BetterTouchTool preferences. You're now ready to go!

## Installation

`npm install btt`

## Example usage

First, you'd need to create a btt instance passing the data for BTT webserver.

```ts
// import Btt class from the package
import { Btt } from 'btt';

// create an instance representing btt webserver
// can be remote or local
const btt = new Btt({
  domain: '127.0.0.1',
  port: 8000,
  protocol: 'http',
  version: '2.525',
});
```

Now you can invoke the actions - there are plenty of way to do it, but all of those are promise based

```ts
// sequentially run three actions - spotlight, type text and night shift
// as all actions are promise based, you can use async/await notation without hussle
btt
  .triggerShortcut('cmd+space').invoke()
  .then(() => btt.sendText({ text: 'Hello world!'}).invoke())
  .then(() => btt.toggleNightShift().invoke());

// you can also use custom chain method to simplify it even more, without using async/await
btt
  .invokeChain()                      // 1)
  .triggerShortcut('cmd+space')       // 2)
  .sendText({text: 'Hello world!'})   // 3)
  .wait(1000)                         // 4)
  .toggleNightShift()                 // 5)
  .call()                             // 6)
  .then(() => console.info('done!'))  // 7)

// Explanation:
// 1) Starts method chaining
// 2) Action that user want to perform
// 3) Action that user want to perform
// 4) Additional method available in chain only - wait before triggering next action
// 5) Action that user want to perform
// 6) Invokes all previously defined actions, ensuring the execution order
// 7) Returns a promise that resolves once all of the actions are fulfilled
```

You can even register system-wide event listener within BTT that'll trigger particular actions

```ts
// creates a trigger in BetterTouchTool. Keep in mind that this is persistent until you manually delete it!
btt.addTriggerAction('oneFingerForceClick', (ev) => {

  // create a list of actions that you want to perform on single finger force click
  const actionsToInvoke = [
    btt.showHUD({
      title: 'Wow!',
      details: 'I triggered! 😍',
    }),
  ];
  
  // and push them to `actions` property in the event object.
  ev.actions.push(...actionsToInvoke);
});

// you can also delete an event listener - trigger: 
btt.removeTriggerAction('oneFingerForceClick', callbackFuntion);
```

But the above method will trigger the callback upon running your script, not when particular event really occurs. If you need to call a function upon event recognition, you'd need to use [btt-node-server](https://github.com/Worie/btt-node-server) and use `addEventListener` and `removeEventListener` methods on btt instance. The callback you provide will be run in nodejs environment, within `vm`.

```ts
const btt = new Btt({
  domain: '127.0.0.1',
  port: 8000,
  protocol: 'http',
  version: '2.525',
  // you need to pass eventServer to use this part of the lib
  eventServer: {
    domain: 'localhost',
    port: 8888,
  },
});

// adds real event listener, that'll be run once event occurs
btt.addEventListener('cmd+ctrl+alt+u', async (ev) => {
  // write the code as you'd normally do -> trigger the action for some interval
  const intervalID = setInterval(() => {
    btt.showHUD({ title: 'It works!'}).invoke();
  }, 1000);

  // you can use fetch API here or anything that your node version will support

  // will stop the interval after 10 seconds
  await new Promise((res, rej) => {
    setTimeout(() => {
      clearTimeout(intervalID);
      res();
    }, 10000);
  });
  
  // the value you return from the callback, will be the response of the btt-node-server 
  return { messsage: 'Hello world!' };
});
```

To get all available events, you'd have to look in the enums (list of all valid events is going to be available soon).
Still, most of the time you can just guess it, because all event names are a lowercased equivalent of triggers from within `BetterTouchTool`.

### Additional action information

For use within browser, you can get the `url` that lies behind all actions and assign it to some `<a href="${link}">Link</a>`. To get `link` you simply need to read the `.url` property of any action: 


```ts
console.log(
  btt.triggerShortcut('cmd+space').url
);
```

If you want to have a sneek peak on the generated action JSON, or want to share it with others who use `BetterTouchTool` you can read the `.json` property of any action. 


```ts
console.log(
  btt.showHUD({ title: 'Hello!' }).json
);
```

## More examples 

For more advanced examples you can visit [the example section](https://github.com/Worie/btt/tree/master/examples)

## Docs

You can visit the docs [here](https://worie.github.io/btt/).

## Notice

Keep in mind that this module only provides handy utility functions that underneath sends request to BTT built in webserver.
So depending on your BTT version some actions may be glitchy. Do not hestitate to report those issues here or in [official BTT community forum](https://community.folivora.ai/categories).

### Related projects:

* [btt](https://github.com/Worie/btt) - BetterTouchTool management in JS
* [btt-json-loader](https://github.com/Worie/btt-json-loader) - JSON loader for BTT
* [btt-node-server](https://github.com/Worie/btt-node-server) - Simple express server, required for advanced event listeners handling
* [btt-touchbar-widgets](https://github.com/Worie/btt-touchbar-widgets) - Working touchbar widgets, based on [btt](https://github.com/Worie/btt)
* [btt-node](https://github.com/Worie/btt-node) Premature version of [btt](https://github.com/Worie/btt) - deprecated

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2018-present, Wojtek Połowniak