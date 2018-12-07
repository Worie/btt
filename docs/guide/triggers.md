### Triggers

::: tip
`Triggers` are meant to be used in those rare cases when you want to operate on BTT on even lower level. For example, 
you may have a case which isn't handled by standard `btt.js` actions - you can manage `BTT` with triggers then.
:::


## Basics

Triggers object available on btt instance is an alternative way of managing the actions (as BTT calls them - triggers).

Each `btt` instance has its `Trigger` property (`FTrigger`). It allows you to delete, modify and create and call any BTT trigger defined manually or via `btt`.

## Getting an instance of existing trigger

You may `get` existing triggers via `btt.Trigger.get`:

<!-- add screenshots -->

```ts
// get particular trigger via name
const triggerInstance = btt.Trigger.get({ name: 'myCustomName' });

// get particular trigger via name
const triggerInstance2 = btt.Trigger.get({ uuid: 'UUID-HASH-OF-TRIGGER' });

// ... 
```

::: tip 
To get either `name` or `uuid` of trigger, simply select trigger in BTT and press `cmd + c`, and `cmd + v` to preview it in text editor.
:::

## Deleting a trigger
Once you have `triggerInstance` you can use "trigger instance methods" <!-- add section link -->.

You can also `delete` particular trigger via `name` or `uuid`:

```ts
// delete trigger via name
const result = btt.Trigger.delete({ name: 'myCustomName' });
// => Promise<CallResult>

// delete trigger via uuid
const result2 = btt.Trigger.delete({ uuid: 'UUID-HASH-OF-TRIGGER' });
// => Promise<CallResult>
```

## Creating a trigger
You can create new trigger from `btt` instance anytime with `create` method of `Trigger` object

```ts
// create new trigger with given UUID / name
const newTriggerInstance = btt.Trigger.create({ uuid: 'UUID-HASH-OF-TRIGGER' });
// => Promise<Trigger> 

// or 
// const newTriggerInstance =  btt.Trigger.create({ uuid: 'UUID-HASH-OF-TRIGGER' });
// => Promise<Trigger> 
```

## Invoking any kind of JSON
And finally - you can basically invoke any kind of JSON payload that you'd like BTT to execute.
So for example, lets assume that you want to manipulate on `JSON` manually and then just send it.

```ts
// anything that you'd like to send to BTT
const myJSON = {};

// send the data to BTT (expect actions to invoke)
const result = btt.Trigger.invoke(myJSON);
// => Promise<CallResult>
```

## Instance methods

When you have the instance of some trigger, then you may perform various actions with it, for example `update` its underlying `JSON`.

```ts
// anything that you'd like to send to BTT
const myJSON = {};

// change existing trigger behavior
const result = triggerInstance.update(myJSON);
// => Promise<CallResult>
```

You can `delete` it (without the need to explicitly pass `uuid` or `name`, contrary to `FTrigger` method): 

```ts
// delete current trigger
triggerInstance.delete();
// => Promise<CallResult>
```

And lastly, you can `invoke` particular trigger:

```ts
// call the JSON assigned to the trigger
triggerInstance.invoke();
// => Promise<CallResult>
```

You can [edit this page on GitHub](https://github.com/Worie/btt/blob/master/docs/guide/triggers.md).