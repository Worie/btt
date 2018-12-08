/**
 * This file sets up window variables and methods available in Guide
 * They will not appear anywhere outside of docs/guide
 */

// inject BTT constructor to window
window.Btt = require('btt').Btt;

// prepare default config variable as a backup
window.defaultConfig = {
  domain: '127.0.0.1',
  port: '64472',
  protocol: 'http',
};

// helper function for reading from localstorage
const readFromLS = () => {
  const config = localStorage.getItem('bttConfig');
  if (!config) {
    // if there was no config yet - save default to LS
    localStorage.setItem('bttConfig', JSON.stringify(window.defaultConfig));
  }
  try {
    // try to read the config file from LS
    const config = JSON.parse(localStorage.getItem('bttConfig'));
    if (typeof config === 'string') {
      // if something went wrong and config is still a string after parsing
      // throw
      throw new Error()
    }
    return config;
  } catch (err) {
    // in case of an error, notify the console and use default
    console.warn('Invalid config read from LS! restoring default');
    return window.defaultConfig;
  }
}

// getter/setter support for `window.config` - allows developer who accesses devtools in guide
// to easly update the config of the library for every page in guide
Object.defineProperty(window, 'config', {
  set: (config) => {
    this.value = config;
    localStorage.setItem('bttConfig', JSON.stringify(config));
  },
  get: () => {
    return readFromLS();
  },
});

// upon entering the page - try to load data from LS 
window.config = readFromLS();

// create a btt lib instance with available config
window.btt = new Btt(config);
