### Events

## Introduction

This guide will be divided into two parts - adding trigger actions (BTT native) and event listeners (enabled via `btt.js` Event server)

## Creating simple events (Triggers)

This is the basic, most simple way of using "events" with `btt.js`. Using `addTriggerAction` and `removeTriggerAction` you can manage the actions registered within BTT.

For example, if you would like to create an action that'll `showHUD` on `cmd+ctrl+alt+t`, you could do it like so: 

```js
// simplest action creation, suitable for most cases
btt.addTriggerAction('cmd+ctrl+alt+t', (ev) => {
  ev.actions.push(...[
    btt.showHUD({ title: 'Hello', content: 'world' }),
  ]);
});
```

As you can see, the basic syntax of `addTriggerAction` is pretty much similar to `HTMLNodeElement.addEventListener` method. It takes a string representing a particular event and a particular callback.

The callback will recieve an object of type `EventParameter`, containing fields such as `actions`, `comment` or `additionalJSON`. See API for more details.

```js
btt.addTriggerAction('cmd+ctrl+alt+t', (ev) => {
  ev.actions.push(...[
    btt.showHUD({ title: 'Hello', content: 'world' }),
  ]);
  
  // will add a note to the main action
  ev.comment = 'My custom note on the action';

  // will append { "BTTEnabled": 0 } to the JSON of the action
  // every key will be prefixed with BTT and the first letter will be uppercased
  ev.additionalJSON = {
    enabled: 0
  };

});
```

::: warning
Contrary to the `addEventListener`, multiple calls of `addTriggerAction` with same parameters will register the action triggers multiple times.
:::

The `ev.actions` is an array into which you should push actions that you'd like to trigger when BTT detects given event (in this case, `cmd+ctrl+alt+t`).

This method will create a base action with subactions that you passed to `ev.actions`. 

::: warning
Keep in mind that `addTriggerAction` does not call passed callback upon recieving the BetterTouchTool trigger! Meaning, if you try to log the date within `EventCallback`, it'll happen only once - during the execution of `addTriggerAction` method, not every time when someone presses `cmd+ctrl+alt+t`.

If you want your callbacks to run upon recieving the events, jump to THE NEXT SECTION (Event Server)
:::

## Removing simple events (Triggers)

You just need to pass exect same arguments to `removeTriggerAction` to remove previously defined simple event trigger: 

```js
// store a callback within variable for easier removal later
const callback = (ev) => {
  ev.actions.push(...[
    btt.showHUD({ title: 'Hello', content: 'world' }),
  ]);
};

// will register the callback in BTT
btt.addTriggerAction('cmd+ctrl+alt+t', callback);

// will remove the callback in BTT
btt.removeTriggerAction('cmd+ctrl+alt+t', callback);
```

::: warning
Registering actions via `addTriggerAction` is persistent - the events will not die when BetterTouchTool restarts. You'll have to remove them manualy (or via `removeTriggerAction`)
:::

## Creating real JavaScript callbacks

To use real callbacks when specific BTT event occurs, use `btt.addEventListener` and `btt.removeEventListener`. Remember, that you need to specify [event server related config]() and host your own version of `btt-node-server` to use this feature.


```js
btt.addEventListener('oneFingerForceClick', (ev) => {

  // invoke the action upon recieving the event
  btt
    .showHUD({ title: 'Whoa!', content: new Date() })
    .invoke();
  
  // if you return an object from within the callback of `addEventListener` - this will be the response of EventServer upon recieving that event
  return {
    customField: 'customValue',
    customField2: 2
  }
});
```

## Removing real JavaScript callbacks

Simialrly to JS, you just need to use `removeEventListener` and pass exactly the same callback and event name as the one you created: 

```js
// will add an event
await btt.addEventListener('oneFingerForceClick', myFunFunction);
// will remove this event
await btt.removeEventListener('oneFingerForceClick', myFunFunction);
```

::: warning
Please note that number of calls to `btt.removeEventListener` must be equal with number of calls of `btt.addEventListener` with same arguments, due to BetterTouchTool limitations. Meaning, that you have to unregister each event as many times as you registered it.
:::

## Creating custom events 

You can even create your own event using `btt.js`! Simply use `namedTrigger` BTT functionality to handle such cases. For simple events:


```js
// register new namedTrigger
btt.addTriggerAction('namedTrigger', (ev) => {
  ev.actions.push(...[
    btt.showNotification({ title: 'I triggered' }),
  ]);

  ev.additionalJSON = ({
    // set the namedTrigger name
    triggerName: 'super-named-trigger',
  });
});
```

Now you can dispatch the event with:

```js
const triggerInstance = btt.Trigger.get({ name: 'myCustomName' });
await triggerInstance.invoke();
```

I'm considering some more abstract way of doing this, but currently this seems like an overkill. You could also make it work with real JS callbacks using `addEventListener` method and invoking the trigger created by this method.

You can [edit this page on GitHub](https://github.com/Worie/btt/blob/master/docs/guide/events.md).