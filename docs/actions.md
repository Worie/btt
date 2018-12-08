### Actions

The basic way of managing your Mac from BetterTouchTool are actions. To see the list of available actions please visit [api docs](https://worie.github.io/btt/api/classes/btt.html).

## Making actions
Each action is a function that depending on it's type, may or may not require additional parameters. 

Lets assume that you want to to toggle dark mode on your Mac from JavaScript. You could do that by using `toggleDarkMode` action:

```js
const action = btt.toggleDarkMode();
```

But that won't actually toggle the dark mode yet. The result of invoking any action is an object that contains `json` and `url` properties and `invoke` method. 

## Invoking an action

So if you wan't to actually to invoke an action, you need to call `invoke()` method of it.


```js
const action = btt.toggleDarkMode();

// will trigger the toggleDarkMode action
const result = action.invoke();

console.log(result);
// Promise<CallResult>
```

The `invoke` method of each action will return a `Promise` that'll contain a `CallResult` - an object that contains various details about the action that was performed, such as execution time, response headers or similar. 

The bottom line is that you can `await` the `invoke` call to make sure that something will get executed once the action performs.

## Url of an action

Under the hood, this library simply fetches specific BetterTouchTool endpoints with prepared endpoints - so when you're invoking an action, you are in fact making a call to the `action.url` endpoint.

```js
const action = btt.toggleDarkMode();

// get the url of the action
console.log(action.url);

// "http://127.0.0.1:64472/trigger_action/?json=%7B%22BTTPredefinedActionType%22%3A197%2C%22BTTEnabled2%22%3A1%2C%22BTTEnabled%22%3A1%7D"
```

You can use `action.url` to attach this endpoint to `<a>` elements for example, which may be handy in **web view**

## JSON of an action

Again - under the hood, BetterTouchTool defines each action as a `JSON` object. Any action that can be created with the use of the library, can be then manually imported to BetterTouchTool by simply copy-pasting it into the program.

```js
const action = btt.toggleDarkMode();

// get the json of the action
console.log(action.json);

// {
//   "BTTPredefinedActionType": 197,
//   "BTTEnabled2": 1,
//   "BTTEnabled": 1
// }
```

The `invoke` method - and thus `url` field are based on `json` property returned by each action. When you're invoking an action - the `json` property is being used to generate `url` of an action, and that url is then fetched.

Surely, you can use this field to simply share some action with other BTT users or create a preset out of it.

::: tip
You can use `btt.triggerShortcut('keycombo-string').invoke()` to invoke various actions from the system - starting from triggering Spotlight via `cmd+space` to even triggering custom, prepared BTT triggers!
:::

## Chaining

btt.js has the ability to create a chain of actions - such chain is a queue of actions which ensures that actions defined on it will be executed synchronously, even though the calls itself are asynchronous.

It allows you to simplify the code a little, without the need of flattening the promise callbacks or using async/await manually.

To start a chain, use `invokeChain` method on `btt` instance.

```js
const chain = btt.invokeChain();
```

Now you can use the action methods as you normally would - but the return value of those methods no longer contain `json` , `url` or `invoke` fields - each method returns the chain instance now.

Additionally, you can use `wait` method on each chain instance, which will delay the next action execution by time specified in `time` parameter (ms)

```js
const chain = btt.invokeChain();

chain
  .showHUD({ title: 'Hello chain!', content: '⛓⛓⛓⛓'}) // returns chain
  .wait(1000) // delays the next action execution by 1s, returns chain
  .hapticFeedback(8); // returns chain as well
```

To start the chain **execution**, you need use `call` method which is only available in chain as well.

```js
chain
  .showHUD({ title: 'Hello chain!', content: '⛓⛓⛓⛓'})
  .wait(1000)
  .hapticFeedback(8)
  .call(); // returns promise, extended CallbackResult
```

`call` will return total execution time, as well as `CallbackResult` for each single action that was a part of this particular chain. Each `chain` can be called multiple times.

Each call on the `invokeChain` method will create a new chain instance, and different chains may be triggered in pararel or set up for use later.

You can also clear any chain (restore to its default, empty state) via `clear` method (available only in chain)


<!-- ## Playground -->

_You can [edit this page on GitHub](https://github.com/Worie/btt/blob/master/docs/guide/actions.md)._