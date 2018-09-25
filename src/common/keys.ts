import * as Types from '../types/types';

export default class Keys {
  /**
   * Returns full list of available keys
   */
  public static get list(): Types.KeyDefinition[] {
    return [{
      "key": "ESC",
      "code": 53
    }, {
      "key": "Mission", // i guess its mission control / launchpad button
      "code": 160
    }, {
      "key": "§",
      "code": 10
    }, {
      "key": "1",
      "code": 18
    }, {
      "key": "2",
      "code": 19
    }, {
      "key": "3",
      "code": 20
    }, {
      "key": "4",
      "code": 21
    }, {
      "key": "5",
      "code": 23
    }, {
      "key": "6",
      "code": 22
    }, {
      "key": "7",
      "code": 26
    }, {
      "key": "8",
      "code": 28
    }, {
      "key": "9",
      "code": 25
    }, {
      "key": "0",
      "code": 29
    }, {
      "key": "-",
      "code": 27
    }, {
      "key": "=",
      "code": 24
    }, {
      "key": "Backspace",
      "code": 51
    }, {
      "key": "Tab",
      "code": 48
    }, {
      "key": "Q",
      "code": 12
    }, {
      "key": "W",
      "code": 13
    }, {
      "key": "E",
      "code": 14
    }, {
      "key": "R",
      "code": 15
    }, {
      "key": "T",
      "code": 17
    }, {
      "key": "Y",
      "code": 16
    }, {
      "key": "U",
      "code": 32
    }, {
      "key": "I",
      "code": 34
    }, {
      "key": "O",
      "code": 31
    }, {
      "key": "P",
      "code": 35
    }, {
      "key": "[",
      "code": 33
    }, {
      "key": "]",
      "code": 30
    }, {
      "key": "Enter",
      "code": 36
    }, {
      "key": "A",
      "code": 0,
    }, {
      "key": "S",
      "code": 1
    }, {
      "key": "D",
      "code": 2
    }, {
      "key": "F",
      "code": 3
    }, {
      "key": "G",
      "code": 5
    }, {
      "key": "H",
      "code": 4
    }, {
      "key": "J",
      "code": 38
    }, {
      "key": "K",
      "code": 40
    }, {
      "key": "L",
      "code": 37
    }, {
      "key": ";",
      "code": 41
    }, {
      "key": "'",
      "code": 39
    }, {
      "key": "\\",
      "code": 42
    }, {
      "key": "LShift",
      "code": 56,
      "modifierValue": 1 << 17,
      "locationMask": 0x00000002,
    }, {
      "key": "Shift",
      "code": 56,
      "modifierValue": 1 << 17,
      "locationMask": 0x00000002,
    }, {
      "key": "`",
      "code": 50
    }, {
      "key": "Z",
      "code": 6
    }, {
      "key": "X",
      "code": 7
    }, {
      "key": "C",
      "code": 8
    }, {
      "key": "V",
      "code": 9
    }, {
      "key": "B",
      "code": 11
    }, {
      "key": "N",
      "code": 45
    }, {
      "key": "M",
      "code": 46
    }, {
      "key": ",",
      "code": 43
    }, {
      "key": ".",
      "code": 47
    }, {
      "key": "/",
      "code": 44
    }, {
      "key": "RShift",
      "code": 60,
      "modifierValue": 1 << 17,
      "locationMask": 0x00000004,
    }, {
      "key": "Fn",
      "code": 63,
      "modifierValue": 1 << 23,
    }, {
      "key": "Ctrl",
      "code": 59,
      "modifierValue": 1 << 18,
      "locationMask": 0x00000001,
    }, {
      "key": "LCtrl",
      "code": 59,
      "modifierValue": 1 << 18,
      "locationMask": 0x00000001,
    }, {
      "key": "RCtrl",
      "code": 59,
      "modifierValue": 1 << 18,
      "locationMask": 0x00002000,
    }, {
      "key": "LAlt",
      "code": 58,
      "modifierValue": 1 << 19,
      "locationMask": 0x00000020,
    }, {
      "key": "Alt",
      "code": 58,
      "modifierValue": 1 << 19,
      "locationMask": 0x00000020,
    }, {
      "key": "LCmd",
      "code": 55,
      "modifierValue": 1 << 20,
      "locationMask": 0x00000008,
    }, {
      "key": "Cmd",
      "code": 55,
      "modifierValue": 1 << 20,
      "locationMask": 0x00000008,
    }, {
      "key": "Space",
      "code": 49
    }, {
      "key": "RCmd",
      "code": 54,
      "modifierValue": 1 << 20,
      "locationMask": 0x00000010,
    }, {
      "key": "RAlt",
      "code": 61,
      "modifierValue": 1 << 19,
      "locationMask": 0x00000040,
    }, {
      "key": "Left",
      "code": 123
    }, {
      "key": "Down",
      "code": 125
    }, {
      "key": "Right",
      "code": 124
    }, {
      "key": "Up",
      "code": 126
    }];
  }

  /**
   * Returns a valid BTT shortcut notation basing on given string
   * @param shortcut 
   */
  public static mapShortcutNotationToBTT(shortcut: string): string {
    // get an array of requested keys
    const requestedKeys = shortcut.split('+');
  
    // create an array of valid BTT keycodes
    const BTTKeys = requestedKeys.map(key => {
      // find the key object that matches the requested key
      const matchedKey = Keys.list.find(BTTKey => {
        return (BTTKey.key).toLowerCase() === key.toLowerCase();
      });
    
      // in case there was no such key, throw an error
      if (!matchedKey) {
        console.error(`Improper key requested: "${key}"`);
        throw new Error();
      }
  
      return matchedKey.code;
    });
  
    // construct the valid structure for BTT shortcuts
    const BTTShortcutNotation = BTTKeys
      // ensure the descending order of buttons to keep BTT working
      .sort()
      .reverse()
      // join the array with comma to get valid BTT format
      .join(',');
  
    return BTTShortcutNotation;
  }

  /**
   * Returns whether passed string is valid shortcut (key combo)
   * @param combo 
   */
  public static isValidShortcut(combo: Types.KeyCombo) {
    // @TODO: recheck if necessary
    // const combo: Types.KeyCombo = String(input);
    const keys = combo.split('+');
  
    // @TODO: recheck if necessary
    // if user passed single key, we don't consider it as a shortcut
    // if (keys[0] === combo) { return false; }
  
    // check if every key in passed combo is valid
    const stringConsistsOnlyValidKeys = keys.every(k => {
      const keyHasBeenFound = Keys.list.find(bttKeyObj => {
        return bttKeyObj.key.toLowerCase() === k.toLowerCase();
      });
      return Boolean(keyHasBeenFound);
    });
  
    // get all definitions that were found
    const keyObjectArray = keys.map(key => Keys.list.find(k => k.key.toLowerCase() === key.toLowerCase()));
  
    // holds a flag whether someone used only one non-modifier
    // examples:
    // valid: cmd+ctrl+space, alt+i, shift+fn+k
    // invalid: a+g, cmd+a+x, shift+p+m
    const stringConsistOnlyOneNonModifier = (
      keyObjectArray.filter((keyObj: Types.KeyDefinition) => {
        return (typeof keyObj.modifierValue === 'undefined')
      }).length === 1
    );
  
    // only if combo has all valid keys and has one non-modifier, we can consider it as valid
    return stringConsistsOnlyValidKeys && stringConsistOnlyOneNonModifier;
  }

  /**
   * For details implementation look up to: https://community.folivora.ai/t/could-you-provide-a-formula-for-determining-keyboard-shortcuts-values/3606/2?u=worie
   * @param shortcut 
   * @param differentiateLeftRight 
   */
  public static createBitmaskForShortcut(shortcut: string, differentiateLeftRight: boolean) {
    // create an array out of used keys
    const usedKeys = shortcut.split('+');

    // local function, used to perform various operations on 
    // key definitions depending on their state
    function modifyMask(cb: Function, bitmaskKey: keyof Types.KeyDefinition) {
      usedKeys.forEach((k) => {
        // find the definition for this particular key
        const foundKey = Keys.list.find((keyObj) => {
          return keyObj.key.toLowerCase() === k.toLowerCase();
        });
    
        // if key exists and has a bitmask, this means that this is a modifier
        // so we have to change the final bitmask of the payload
        if (foundKey && foundKey[bitmaskKey]) {
          cb(foundKey[bitmaskKey]);
        }
      });
    }

    // default bitmask value
    let bitmask = 0;

    // bitshift for all modifiers
    modifyMask((foundValue: number) => {
      bitmask |= foundValue;
    }, 'modifierValue');

    // if user is differentiating, we need to modify the value furthermore
    if (differentiateLeftRight) {
      modifyMask((foundValue: number) => {
        bitmask += foundValue;
      }, 'locationMask');
    }

    // finally, return valid bitmask for this particular key combo
    return bitmask;
  }

  /**
   * Returns the keycode of specific key
   * @param key
   */
  public static getKeyCode(key: string) {
    return Keys.list.find(k => key.toLowerCase() === k.key.toLowerCase()).code;
  }

  /**
   * Returns boolean whether this particular combo is requesting a location differentiation.
   * Basically checks the first letter of the key for 'l' or 'r', excluding mentioned letters.
   * @param combo 
   */
  public static isDifferentiating(combo: Types.KeyCombo) {
    return combo.split('+').some(key => {
      return (
        // key length must be bigger than one to enable differentiating (modifier + non-modifier)
        key.length > 1 && 
        // the first key needs to have "l" or "r" prefix
        (key[0].toLocaleLowerCase() === 'l' || key[0].toLocaleLowerCase() === 'r') 
      );
    })
  }
}