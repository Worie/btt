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

// sequentially run three actions - spotlight, type text and night shift
btt.triggerShortcut('cmd+space').invoke()
  .then(() => btt.sendText({ text: 'Hello world!'}).invoke())
  .then(() => btt.toggleNightShift().invoke());

// creates a trigger in BetterTouchTool. Keep in mind that this is persistent until you manually delete it!
btt.addEventListener('oneFingerForceClick', (ev) => {

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

// get the url of the action - can be assigned to <a> element for example, and once clicked - will perform given action
console.log(btt.triggerShortcut('cmd+space').url);

// you can also delete an event listener - trigger: 
btt.removeEventListener('oneFingerForceClick', callbackFuntion);

```

For more advanced examples you can visit [the example section](examples)

## Docs

You can visit the docs [here](https://worie.github.io/btt/).

## Notice

Keep in mind that this module only provides handy utility functions that underneath sends request to BTT built in webserver.
So depending on your BTT version some actions may be glitchy. Do not hestitate to report those issues here or in [official BTT community forum](https://community.folivora.ai/categories).

### Related projects:

* [btt](https://github.com/Worie/btt) - BetterTouchTool management in JS
* [btt-json-loader](https://github.com/Worie/btt-json-loader) - JSON loader for BTT
* [btt-node](https://github.com/Worie/btt-node) Premature version of [btt](https://github.com/Worie/btt) - deprecated
* [btt-touchbar-widgets](https://github.com/Worie/btt-touchbar-widgets) - Working touchbar widgets, based on [btt](https://github.com/Worie/btt)

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2018-present, Wojtek Połowniak