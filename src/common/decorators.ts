import * as Types from '../types/types';
import { BaseAction } from '../abstract/base-action';
import ADummyAction from '../common/actions/dummyAction';
import CommonUtils from '../common/util';


/**
 * This decorator initializes the given class with config from its target
 * @param actionClass 
 */
export function Action(theClass: Types.Class<BaseAction>): Function {
  return function (target: any, key: any, descriptor: PropertyDescriptor) {
    return {
      value: (function (...args: any[]) {
        if (checkBlackListPresence(theClass, this.config.blacklist)) {
          if (!this.config.silent) {
            console.error(`You can't use any of these actions, due to explicit blacklisting: ${JSON.stringify(this.config.blacklist, null, 2)}`)
            throw new Error(`Attempted to use disallowed action.`);
          } else {
            if (this.isChainable) {
              const action = new ADummyAction(this.config, CommonUtils.mapClassNameToMethodName(theClass));
              this.addToQueue(action.invoke.bind(action));
              return this;
            } else {
              return new ADummyAction(this.config, CommonUtils.mapClassNameToMethodName(theClass));
            }
          }
        }

        if (this.isChainable) {
          const action = new theClass(this.config, ...args);
          this.addToQueue(action.invoke.bind(action));
          return this;
        }
        return new theClass(this.config, ...args);
      }),
    };
  };
}

/**
 * This decorator initializes the given method as a event equivalent of particular btt instance
 * @param methodName 
 */
export function EventMethod(methodName: string): Function {
  return function (target: any, key: any, descriptor: PropertyDescriptor) {
    return {
      value: (function (...args: any[]) {
        return this.event[methodName](...args);
      }),
    };
  };
}

export function Disallow(reason: string): Function {
  return function(target: any, key: any, descriptor: PropertyDescriptor) {
    return {
      value: (function (...args: any[]): null {
        if (!this.silent) {
          throw new Error(`You cannot use this method here. ${reason}`)
        }
        
        return null;
      }),
    };
  }
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

