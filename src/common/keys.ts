interface IKey {
  key: string;
  code: number;
  locationMask?: number;
  modifierValue?: number;
}

export const KEYS: IKey[] = [{
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

/**
 * Returns a valid BTT shortcut notation basing on given string
 * @param shortcut 
 */
export function mapShortcutNotationToBTT(shortcut: string): string {
  // get an array of requested keys
  const requestedKeys = shortcut.split('+');

  // create an array of valid BTT keycodes
  const BTTKeys = requestedKeys.map(key => {
    // find the key object that matches the requested key
    const matchedKey = KEYS.find(BTTKey => {
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

export function isValidShortcut(input: string) {
  const combo = String(input);
  const keys = combo.split('+');
  if (keys[0] === combo) { return false; }
  const stringConsistsOnlyValidKeys = keys.every(k => {
    const keyHasBeenFound = KEYS.find(bttKeyObj => {
      return bttKeyObj.key.toLowerCase() === k.toLowerCase();
    });
    return Boolean(keyHasBeenFound);
  });

  const keyObjectArray = keys.map(key => KEYS.find(k => k.key.toLowerCase() === key.toLowerCase()));

  const stringConsistOnlyOneNonModifier = (
    keyObjectArray.filter((keyObj: IKey) => {
      return (typeof keyObj.modifierValue === 'undefined')
    }).length === 1
  );

  return stringConsistsOnlyValidKeys && stringConsistOnlyOneNonModifier;
}

/**
 * For details implementation look up to: https://community.folivora.ai/t/could-you-provide-a-formula-for-determining-keyboard-shortcuts-values/3606/2?u=worie
 * @param shortcut 
 * @param differentiateLeftRight 
 */
export function createBitmaskForShortcut(shortcut: string, differentiateLeftRight: boolean) {
  const usedKeys = shortcut.split('+');

  function modifyMask(cb: Function, bitmaskKey: keyof IKey) {
    usedKeys.forEach((k) => {
      const foundKey = KEYS.find((keyObj) => {
        return keyObj.key.toLowerCase() === k.toLowerCase();
      });
  
      if (foundKey && foundKey[bitmaskKey]) {
        cb(foundKey[bitmaskKey]);
      }
    });
  }

  let bitmask = 0;

  modifyMask((foundValue: number) => {
    bitmask |= foundValue;
  }, 'modifierValue');

  if (differentiateLeftRight) {
    modifyMask((foundValue: number) => {
      bitmask += foundValue;
    }, 'locationMask');
  }

  return bitmask;
}

export function getKeyCode(key: string) {
  return KEYS.find(k => key.toLowerCase() === k.key.toLowerCase()).code;
}

/**
 * Returns boolean whether this particular combo is requesting a location differentiation.
 * Basically checks the first letter of the key for 'l' or 'r', excluding mentioned letters.
 * @param combo 
 */
export function isDifferentiating(combo: string) {
  return combo.split('+').some(key => {
    return (
      key.length > 1 && 
      (key[0].toLocaleLowerCase() === 'l' || key[0].toLocaleLowerCase() === 'r') 
    );
  })
}