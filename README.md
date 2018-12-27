# btt
<p align="center"><img width="100" src="https://user-images.githubusercontent.com/6313514/42529852-d9c76ab0-847f-11e8-8d8c-323d1d995b2d.png" alt="Package logo"></p>

<p align="center">
  <img src="https://badge.fury.io/js/btt.svg" alt="Package version">
  <img src="https://snyk.io/test/github/worie/btt/badge.svg" alt="Vunerabilities"></p>
<p align="center">
  <a href="https://nodei.co/npm/btt/">
  <img src="https://nodei.co/npm/btt.png?downloads=true&downloadRank=true" alt="Vunerabilitiesn"></a>
</p><p align="center"><h2 align="center">Manage your BetterTouchTool in JavaScript, easily.
</h2></p>

## Get started 

See the [guide](https://worie.github.io/btt/guide/introduction.html) and [api](https://worie.github.io/btt/api) for `btt.js`. 

## About 
This package is a handy wrapper over [BetterTouchTool](https://folivora.ai/) built in webserver API. (by [@Andreas Hegenberg](https://github.com/fifafu))

This package will allow you to automate you MacOS-running machine using JavaScript. You'll be able to:

* Create event listeners that'll run within an operating system, outside the browser!
* Toggle your do-not-disturb state
* Show a system notification
* Toggle Night Shift
* Sleep your computer after timeout
* Create your own **touchbar widgets**
* Feel a notification via **haptic engine**
* Control the brightness of the screen and keyboard
* Control the volume levels
* Use the content of your clipboard to be opened in a specific url or application
* Create your own UIs "within system" using web view 
* Trigger a system-wide keyboard shortcut
* Send a shortcut to a specific application
* Show / Hide / Open / Quit a specific applcation
* Move your mouse to a specific position and click
* Hide your cursor
* Lock / Unlock your MacOS machine
* Integrate your flow / touchbar with various APIs ...

*and anything else that BetterTouchTool or the JavaScript specification will allow you to do!*

## Typed, browser/server side library
This package provides its own type definitions and can be run both on browser (using module bundlers) and in a nodejs environment.

## Requirements

This package depends on the application [BetterTouchTool](https://folivora.ai/) in at least version v2.0.0, you need to have it installed and running before going further.

Then, please enable and configure the webserver in the BetterTouchTool preferences. You're now ready to go!

## Installation

`npm install btt`

## Example usage

First, create a btt instance passing the required data for BTT webserver.

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

Now you can invoke the actions - there are plenty of ways to do it, and all are promise-based.

```ts
// sequentially run three actions - spotlight, type text and night shift
// as all actions are promise-based, you can use async/await notation without hassle
btt
  .triggerShortcut('cmd+space').invoke()
  .then(() => btt.sendText({ text: 'Hello world!'}).invoke())
  .then(() => btt.toggleNightShift().invoke());

```

## Response structure for every action

```ts
// every single action returns a CallResult object containing information about the Call

interface CallResult {
  time: number;     // contains time in MS that this action took to perform (including fetch time)
  status: number;   // contains an HTTP status / string
  value: any;       // depending on the method used, may return an array, object or fetch result
  note?: string;    // an additional note for the user
}
```

## Chaining methods

```ts
// you can also use a custom chain method to simplify even more and avoid using async/await
btt
  .invokeChain()                      // 1)
  .triggerShortcut('cmd+space')       // 2)
  .sendText({text: 'Hello world!'})   // 3)
  .wait(1000)                         // 4)
  .toggleNightShift()                 // 5)
  .call()                             // 6)
  .then(v => console.info(v))         // 7)

// Explanation:
// 1) Starts method chaining
// 2) Action that a user wants to perform
// 3) Action that a user wants to perform
// 4) Additional method available in chain only - wait before triggering next action
// 5) Action that a user wants to perform
// 6) Invokes all previously-defined actions, ensuring the execution order
// 7) Returns a promise that resolves once all of the actions are fulfilled. 
//    Contains information about the status of the chain (time, value, status)
```

## Event listeners

You can even register a system-wide event listener within BTT that'll trigger particular actions

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

The above method will trigger the callback upon running your script, not when a particular event really occurs. If you need to call a function upon event recognition, you need to use [btt-node-server](https://github.com/Worie/btt-node-server) and use the `addEventListener` and `removeEventListener` methods on the btt instance. The callback you provide will run in the nodejs environment, within `vm`.

```ts
const btt = new Btt({
  domain: '127.0.0.1',
  port: 8000,
  protocol: 'http',
  version: '2.525',
  // pass eventServer to use this part of the lib
  eventServer: {
    domain: 'localhost',
    port: 8888,
  },
});

// adds real event listener, that'll run once event occurs
btt.addEventListener('cmd+ctrl+alt+u', async (ev) => {
  // write the code as you'd normally do -> trigger the action for some interval
  const intervalID = setInterval(() => {
    btt.showHUD({ title: 'It works!'}).invoke();
  }, 1000);

  // you can use fetch API here or anything that your node version will support

  // stops the interval after 10 seconds
  await new Promise((res, rej) => {
    setTimeout(() => {
      clearTimeout(intervalID);
      res();
    }, 10000);
  });
  
  // the value you return from the callback will be the response of the btt-node-server 
  return { messsage: 'Hello world!' };
});
```

To get all available events, you have to look in the enums (list of all valid events will be available soon).
Most of the time you can just guess because all event names are the lowercased equivalent of the triggers from within `BetterTouchTool`.

### Additional action information

For use within the browser, you can get the `url` that lies behind all actions and assign it to some `<a href="${link}">Link</a>`. To get `link` you simply need to read the `.url` property of any action: 


```ts
console.log(
  btt.triggerShortcut('cmd+space').url
);
```

If you want to have a peak at the generated action JSON, or want to share it with others who use `BetterTouchTool` you can read the `.json` property of any action. 


```ts
console.log(
  btt.showHUD({ title: 'Hello!' }).json
);
```

## More examples 

For more advanced examples visit [the example section](https://github.com/Worie/btt/tree/master/examples)

## Notice

Keep in mind that this module only provides handy utility functions that send requests to BTT built in webserver.
So depending on your BTT version, some actions may be glitchy. Do not hestitate to report those issues here or in the [official BTT community forum](https://community.folivora.ai/categories). 

Also, keep in mind that accessing any kind of low level APIs from JS may be dangerous, make sure to [stay secure](#)

### Related projects:

* [btt](https://github.com/Worie/btt) - BetterTouchTool management in JS
<!-- * [btt-json-loader](https://github.com/Worie/btt-json-loader) - JSON loader for BTT -->
* [btt-node-server](https://github.com/Worie/btt-node-server) - Simple express server, required for advanced event listener handling
<!-- * [btt-touchbar-widgets](https://github.com/Worie/btt-touchbar-widgets) - Working touchbar widgets, based on [btt](https://github.com/Worie/btt) -->
* [btt-node](https://github.com/Worie/btt-node) Premature version of this package ([btt](https://github.com/Worie/btt)) - deprecated

## License

[MIT](http://opensource.org/licenses/MIT)
