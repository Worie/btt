import * as Types from '../types/types';
import { BaseAction } from '../abstract/base-action';
import ADummyAction from '../common/actions/dummyAction';
import CommonUtils from '../common/util';

/**
 * This decorator initializes the given class with config from its target
 * @param actionClass
 */
export function Action(theClass: Types.Class<BaseAction>): Function {
  return function(target: any, key: any, descriptor: PropertyDescriptor) {
    return {
      value(...args: any[]) {
        if (checkBlackListPresence(theClass, this.config.blacklist)) {
          if (!this.config.silent) {
            console.error(
              `You can't use any of these actions, due to explicit blacklisting: ${JSON.stringify(
                this.config.blacklist,
                null,
                2,
              )}`,
            );
            throw new Error(`Attempted to use disallowed action.`);
          } else {
            const newDummy = new ADummyAction(this.config, CommonUtils.mapClassNameToMethodName(theClass));
            return newDummy;
          }
        }
        const newAction = new theClass(this.config, ...args);
        return newAction;
      },
    };
  };
}

// check node debugger
export function Chainable(): Function {
  return function(target: any, key: any, descriptor: any) {
    const theMethod = target[key];

    const value = function(...args: any[]) {
      const action = (theMethod as Function).call(this, ...args);
      this.addToQueue(action.invoke.bind(action));
      return this;
    };

    return {
      value,
    };
  };
}

/**
 * This decorator initializes the given method as a event equivalent of particular btt instance
 * @param methodName
 */
export function EventMethod(methodName: string): Function {
  return function(target: any, key: any, descriptor: PropertyDescriptor) {
    return {
      value(...args: any[]) {
        return this.event[methodName](...args);
      },
    };
  };
}

/**
 * Will return whether particular action is blacklisted
 * @param theClass
 * @param blacklist
 */
function checkBlackListPresence(theClass: Types.Class<BaseAction>, blacklist: string[]) {
  if (!blacklist) {
    return false;
  }

  const lowerCasedList = blacklist.map(e => e.toLowerCase());

  if (lowerCasedList.indexOf(CommonUtils.mapClassNameToMethodName(theClass)) > -1) {
    return true;
  }
  return false;
}
