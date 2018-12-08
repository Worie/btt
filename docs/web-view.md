### Web view

## Introduction
Web view is real powerful way to create custom UI with BetterTouchTool (and surely, `HTML`, `CSS` and `JavaScirpt` or it's supersets). Basically it allows you to open UI-less browser, with transparent background of custom size and position. You can also specify in which browser you'd like to show your content.

## Basic example

The most basic example will allow you to open an URL of your choice - this is also most recommended approach when creating advanced web views, because you can use [custom webpack boilerplate](#Boilerplate).

```js
await btt.showWebView({
  width: 200,
  height: 220,
  x: 600,
  y: 400, 
  name: 'webview example',
  url: 'https://user-images.githubusercontent.com/6313514/42585502-19954016-8536-11e8-8b8f-4051b299e81f.png',
}).invoke();
// => Promise<CallResult> 
```

The code above will create a window of size `200x220` on position `600:400`. The name is an internal indentifier for this particular webview. And surely, you can pass whathever URL you'd like and it'll open this page.

For example, the code above will show a webview with `btt.js` logo. For example, to open your twitter feed you could do:

```js
await btt.showWebView({
  width: 200,
  height: 1080,
  x: 0,
  y: 400, 
  name: 'Twitter feed',
  url: 'https://twitter.com',
}).invoke();
// => Promise<CallResult> 
```

## Boilerplate

Visit HERE, clone the repo, install assets and run the server with `npm run start` to start a live server with BTT, typescript and scss preconfigured.

## Inline data 

You may also pass inline html data to web view via `html` property:

```js
await btt.showWebView({
  width: 200,
  height: 220,
  x: 600,
  y: 400, 
  name: 'Inline webview',
  html: '<html><body>Hello world!</body></html>',
}).invoke();
// => Promise<CallResult>
```

::: tip
Keep in mind that using `html` and `url` together will ignore the `html` flag, as `url` has higher priority by design. So if you want to use `html` property, omit the `url` flag
:::

_You can [edit this page on GitHub](https://github.com/Worie/btt/blob/master/docs/guide/web-view.md)._