### Introduction

Howdy! If you're reading this that probably means you like automating your OS and probably know a bit of JavaScript - if so, you're at the right place! 

## What is it?

This package is a handy wrapper over [BetterTouchTool](https://folivora.ai/) built in webserver API. (by [@Andreas Hegenberg](https://github.com/fifafu))

BetterTouchTool is MacOS only app - and **while you can control a Mac from other devices** such as PC with different OS, or a mobile device - **you can only control Macs with it**.

## What does it do?


btt.js allows you to perform various low level operations from within JS, which wouldn't be possible normally - such as controlling the mouse, triggering system-wide keyboard shortcuts or even modyfing Apple TouchBar!

You'll be able to:

* Create event listeners that'll be run within operating system, outside browser!
* Toggle your do-not-disturb state
* Show a system notification
* Toggle Night Shift
* Sleep your computer after timeout
* Create your own **touchbar widgets**
* Feel a notification via **haptic engine**
* Control the brightness of the screen, keyboard
* Control the volume levels
* Use the content of your clipboard to be opened in specific url or application
* Create your own UIs "within system" using web view 
* Trigger a system wide keyboard shortcut
* Send a shortcut to specific application
* Show / Hide / Open / Quit specific applcation
* Move your mouse to specific position and click it
* Hide your cursor
* Lock / Unlock your MacOS machine
* Integrate your flow / touchbar with various APIs ...

*and anything else that BetterTouchTool or JavaScript specification will allow you to do!*

## Basics
<!-- ADD screenshots, say how to copy JSONs from BTT -->

## Important notices

Just as a heads up - this library and BetterTouchTool in general will allow you to do awesome things - such as creating custom, shared clipboard over your local WAN network, auto lock your PC when Bluetooth device moves away and many more - it can be dangerous.

### Default behaviour
By default, BetterTouchTool webserver is set up to allow network request only from localhost - that means, that no one - even from same local network - can use its capabilities to harm your Machine. 

But that's not always the case - by enabling its webserver API you make it possible for websites that know your internal configuration to invoke malicious actions - simply visiting such website may cause undesired behaviour of your machine. That's why it is super important to ** stay secure **.

You can [edit this page on GitHub](https://github.com/Worie/btt/blob/master/docs/guide/introduction.md).