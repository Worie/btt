### Variables

Sometimes you may need to store data somewhere - for example, when operating on some custom TouchBar widget. But you don't necessarly have to set up a database just for that - BetterTouchTool comes with built in variable mechanism.

## Setting and getting a value

With `btt.js` you can manipulate on those variables using syntax similar to `Map()` - which is accessible on every `btt` instance:

```js
// will set up `key` variable to `value`
await btt.state.set('key', 'value');

// you can later read it with:
await btt.state.get('key');
// => Promise<'value'>

// or remove it:
await btt.state.del('key');
```

## Persistent variables

By default, all variables live as long as BetterTouchTool process lives. However, you can explicitly request particular variable to be persistent even when BTT is closed.

Under the hood, it simply stores the values you save to it in `plist` file within BTT configuration directory.

To use declare variable as persistent, set third parameter of `btt.state.set` to `true` (defaults to `false`)

```js
// this variable will be accessible even after your machine restart
await btt.state.set('myVar', 100, true);
```

::: tip
BetterTouchTool variables are also available from AppleScript - so you can use `executeScript` which will fetch it for you, or simply get those before script execution and pass them as constants to the script that you want to run using `btt.state.get`
:::

You can [edit this page on GitHub](https://github.com/Worie/btt/blob/master/docs/guide/variables.md).