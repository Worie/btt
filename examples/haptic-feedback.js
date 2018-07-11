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

// send haptic feedback, it accepts number from 1 to 15 as a parameter
btt.hapticFeedback(1).invoke();

// code below will be a little demo of haptic feedback that is available
const delay = (timeout) => new Promise((res, rej) => setTimeout(() => res(), timeout));
console.log(`\nWelcome to hapticFeedback demo! Press Ctrl + C to quit`);

(async () => {
  for (let i = 1; i < 16; i++) {
    console.log(`\nNow presenting haptic mode ${i} / 15 . Demo will start in:\n`);
    await delay(1000);
    console.log('3 ...')
    await delay(1000);
    console.log('2 ...');
    await delay(1000);
    console.log('1 ... \n');
    await delay(1000);

    console.log('Boom!');
    btt.hapticFeedback(i).invoke();
    await delay(500);
    console.log('Boom!');
    btt.hapticFeedback(i).invoke();
    await delay(500);
    console.log('Boom!');
    btt.hapticFeedback(i).invoke();
    await delay(500);
    
    console.log('\nDone!');
  }

  console.log('\n\nThe demo is complete. Have fun');
})();

