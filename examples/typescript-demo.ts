// normally you'd import it like so
// import { Btt } from 'btt';

// for the sake of the example, we're importing this package built code
// const { Btt, ISendTextConfig, IBTTConfig, dsadjaisd } = require('../dist/index');

// const btt = new Btt({
//   domain: '127.0.0.1',
//   port: '64472',
//   protocol: 'http',
//   sharedKey: 'sBP2fYAo2Fu8TdfzhLpwdUm'
// });

// const btt = new Btt();
// you can use the typing definitions provided by package
// plays pretty well with vsc intelisense
// const config: ISendTextConfig = {
//   text: 'Hello world!', 
//   moveCursorLeft: 5,
// };

// // other than that, everything works the same as you would use it without TS
// btt.sendText(config).invoke();