/**
 * Note: This is the most complex set up possible with btt at this point - it requires special local node server installed
 * Have a look at this repo: https://github.com/Worie/btt-node-server - set it up and run the web server by folllowing the instructions in readme.
 * Once you have btt-node-server running - go back to this example again! 
 */

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
  sharedKey: 'sBP2fYAo2Fu8TdfzhLpwdUm',
  // keep in mind that you specify the address of the node server that'll take care of managing the events!
  eventServer: {
    domain: 'localhost',
    port: 8888,
  },
});

// set up an event listener - it'll be run on the local web server!
const myCallback = async function() {
  // set up an interval which will show a HUD every 2 seconds.
  let interval = setInterval((() => {
    this.showHUD({title: 'woooow'}).invoke();
  }), 2000);

  // wait for ten seconds - then clear the interval

  await new Promise((res, rej) => setTimeout(() => {clearInterval(interval); res()}, 10000));
  
  // whatever you return inside callback function, will be returned by the endpoint on the btt-node-server
  return { message: 'completed!'};
};

// set up previously defined eventListener
btt.addEventListener('cmd+u', myCallback);

// remove the event listener after 20seconds
setTimeout(() => {
  btt.removeEventListener('cmd+u', myCallback);
}, 20000);