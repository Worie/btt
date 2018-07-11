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

// if you click outside the webview, it'll automatically close
// surely you can trigger any kind of btt action from there, too!

btt.showWebView({
  width: 200,
  height: 220,
  x: 600,
  y: 400, 
  name: 'webview example',
  url: 'https://user-images.githubusercontent.com/6313514/42585502-19954016-8536-11e8-8b8f-4051b299e81f.png',
}).invoke();

// for an awesome example, please refer here: https://folivora.ai/blog/post/13000
// you can download the example from the url, go here https://share.folivora.ai/sharedPreset/c21e569b-3f2a-47fc-a9d1-f252439f15df