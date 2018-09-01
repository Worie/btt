/**
 * This decorator initializes the given class with config from its target
 * @param actionClass 
 */
export default function ActionFactory(actionClass: any): Function {
  return function (target: any, key: any, descriptor: PropertyDescriptor) {
    return {
      value: (function (...args: any[]) {
        return new actionClass(this.config, ...args)
      }),
    };
  };
}