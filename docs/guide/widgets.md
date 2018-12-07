### Widgets

## Basics

Widgets are buttons / entities that live on your MBP TouchBar - they can autorefresh on your demand and display images or text. You can customize the actions that happen upon clicking/holding the widget and its appearance (such as background or font color)

## What's possible

BetterTouchTool allows you to use the TouchBar in two separate modes - with MacOS control strip and without it (full control).

Full control strip may look like this:

On the other hand, it may be used as a group on the strip:

## Creating Touchbar widget

You can create a Touchbar widget on the fly

```js
const widget = await btt.Widget.create({
  name: 'Touchbar widget name',
  mode: 'node',
  // if you use the package on the frontend, you may need to provide path option manually, ex. with nvm:
  // path: '/Users/UserName/.nvm/versions/node/v9.2.0/bin/node'
  alwaysShow: false, // whether this widget should always be visible
  script: `console.log('Hello world!')`, // node.js compilant code
  appearance: {
    iconHeight : 22,
    iconWidth : 22,
    padding : -5,
    freeSpaceAfterButton : 5.000000, 
    buttonColor : "0.000000, 0.000000, 0.000000, 255.000000",
    alternateBackgroundColor : "128.829533, 128.829533, 128.829533, 255.000000"
  },
});

// you can now check its id
console.log(widget.uuid); 
// => '07CA71DD-A3F9-4CF0-8340-9285373399EC'
```

## Updating the widget

To update the widget you need to pass a callback function to the `update` method of this particular widget instance.
The callback should return an object of values that you want to update.

```js
const widget = await btt.Widget.create(options);

widget.update(() => {
  return {
    // will show current date each time this callback is run
    text: new Date().toLocaleTimeString(),
    background_color: '0,0,0,1',
  };
});
// => Promise<CallResult> 
```

You may also use `update` method without callback parameter, if you set the default callback function with `setDefaultCallback` method:

```js
const callback = () => {
  return {
    // will show current date each time this callback is run
    text: new Date().toLocaleTimeString(),
    background_color: '0,0,0,1',
  };
};

widget.setDefaultCallback(callback);
// => void

// each call will invoke the `callback` function 
widget.update(); 
// => Promise<CallResult> 
```

## Refreshing a widget

If you pass default script to your touchbar widget you can use `refresh` method to run it again. It may aquire same resuts as using `update` method, but `refresh` is more performant due it's implementation. Using `refresh` will just send the `UUID` of the Touchbar widget that'd need to be updated, whereas `update` will send all the data explicitly. `update` is intended to update certian values of the widget and `refresh` just runs the passed script again. Also, `update` may be **slightly** more expensive in terms of performance and `refresh`.

```js
const widget = await btt.Widget.create({ 
  // ...
  script: `console.log(new Date().toISOString())`, // node.js compilant code
  // ...
});
// => Promise<Widget> 

// the script will run once, showing the current date
// after some time, you might call:
await widget.refresh();
// => Promise<CallResult> 

// and it'll update the value, running the script again
```


## Deleting a widget

```js
const widget = await btt.Widget.get({
  uuid: 'Your UUID',
});
await widget.delete();
// => Promise<CallResult> 
```


You can [edit this page on GitHub](https://github.com/Worie/btt/blob/master/docs/guide/widgets.md).