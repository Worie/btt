// you could import it like this if you're using TS
// import { Btt } from 'btt';

// or like that, if you're using requirejs
// const Btt = require('btt').Btt;

// for the sake of the example, we're importing this package built code
const Btt = require('../dist/index').Btt;

// connect to some btt webserver
const btt = new Btt({
  domain: '127.0.0.1',
  port: '64472',
  protocol: 'http',
  sharedKey: 'sBP2fYAo2Fu8TdfzhLpwdUm'
});

// you can send a shortcut to specific application in your file system - for example photoshop, firefox, built in or mostly anything.
// ex. you can install plugin to your FireFox that'll play/pause the video via given shortcut, and then trigger it like so:
// Example browser extension: https://github.com/DanielKamkha/PlayPause
btt.sendShortcut('shift+alt+p', '/Applications/Firefox.app').invoke();

// keep in mind that some apps require focus to recieve keyboard shortcuts, this would probably have to be tweaked manually 
// or you can set the focus of an app via btt.toggleApplication('/Absolute/Path/To/Application.app');