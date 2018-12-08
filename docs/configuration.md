### Configuration

This section will get you through basics of `btt.js` instance config.

## Connecting to BTT webserver

The most essential properties related to the connection to BTT webserver API are `domain`, `protocol`, and `port`.

```js
const btt = new Btt({
  domain: '127.0.0.1',
  protocol: 'http',
  port: 64472,
});
```

::: tip
`domain`, `protocol`, `port` and `sharedKey` must match the definition within BetterTouchTool configuration to work
:::

## Shared key

If you have set up a `sharedKey` in you BTT webserver config (recommended), you need to pass `sharedKey` property as well: 

```js
const btt = new Btt({
  domain: '127.0.0.1',
  protocol: 'http',
  port: 64472,
  sharedKey: 'ABCDEFGHIJKLMNOPRSTUVWXYZ',
});
```

## Blacklisting 

If you read the **Staying secure** section you already know that you can disable some actions within particular `btt.js` instance.

To do so provide array of action names that you want to disable, for example:

```js
const btt = new Btt({
  domain: '127.0.0.1',
  protocol: 'http',
  port: 64472,
  blacklist: ['showHUD'],
});
```

will disable `btt.showHUD` method.

## Silent mode

If you do not wish to display error / warning messages via `btt.js` - for example if blacklisted action is being invoked, you can pass `silent` flag set to `true` (`false` by default)

```js
const btt = new Btt({
  domain: '127.0.0.1',
  protocol: 'http',
  port: 64472,
  blacklist: ['showHUD'],
  silent: true,
});
```

<!-- ## Event server configuration -->

_You can [edit this page on GitHub](https://github.com/Worie/btt/blob/master/docs/guide/configuration.md)._