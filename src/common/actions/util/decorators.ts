/**
 * This decorator initializes the given class with config from its target
 * @TODO: add proper typings
 * @param actionClass 
 */
export function Action(actionClass: any): Function {
  return function (target: any, key: any, descriptor: PropertyDescriptor) {
    return {
      value: (function (...args: any[]) {
        if (checkBlackListPresence(actionClass.name, this.config.blacklist)) {
          console.error(`You can't use any of those actions: ${JSON.stringify(this.config.blacklist, null, 2)}`)
          throw new Error(`Attempted to use disallowed action.`);
        }
        return new actionClass(this.config, ...args)
      }),
    };
  };
}

export function EventMethod(methodName: string): Function {
  return function (target: any, key: any, descriptor: PropertyDescriptor) {
    return {
      value: (function (...args: any[]) {
        return this.event[methodName](...args);
      }),
    };
  };
}

/**
 * This function will map inner class names to simplified method names, used within lib
 * @param name 
 */
function mapClassNameToMethodName(name: string) {
  if (name[0] !== 'A') {
    throw new Error('Improper action format. This is probably issue caused by developer');
  }
  return name.substring(1).toLowerCase();
}

/**
 * Will return whether particular action is blacklisted
 * @param name 
 * @param blacklist 
 */
function checkBlackListPresence(name: string, blacklist: string[]) {
  if (!blacklist) {
    return false;
  }

  const lowerCasedList = blacklist.map(e => e.toLowerCase());

  if (lowerCasedList.indexOf(mapClassNameToMethodName(name)) > -1) {
    return true;
  }
  return false;
}