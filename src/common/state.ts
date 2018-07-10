/**
 * Provides an abstraction over BetterTouchTool variables
 * is meant to has similar methods to ES6 Map instance
 */

import * as CommonUtils from '../common/util';
import * as Types from '../../types';

export function init(instanceConfig: Types.IBTTConfig) {

  /**
   * Sets the variable name to specific value
   * @param key a name of the variable that is supposed to be saved
   * @param value new value of the variable
   * @param isPersistent whether the variable should persist after BTT reboot
   */
  const set = async (key: string, value: string | number, isPersistent?: boolean) => {
    if (typeof value !== 'number' && typeof value !== 'string') {
      throw new Error('You can only set the variable value to string or number');
    }
  
    let variableType: string = typeof value;
    if (variableType === 'number' && Number.isNaN(value as number)) {
      throw new Error('You passed NaN. Aborting');
    }
  
    const persistent: string = (isPersistent ? 'persistent_': '');
  
    const method: string = `set_${persistent}${variableType}_variable`;
  
    return CommonUtils.makeAction(method, { variableName: key, to: value }, instanceConfig);  
  };

  /**
   * Retrieves BTT variable
   * @param key a variable name to retrieve
   * @param mode string or number. Providing this parameter makes this method more efficient
   */
  const get = async (key: string, mode?: 'string' | 'number'): Promise<number | string> => {
    const getStringVariable = async () => {
      const response = await CommonUtils.makeAction(`get_string_variable`, { variableName: key}, instanceConfig);
      return response.text();
    };

    const getNumberVariable = async () => {
      const response = await CommonUtils.makeAction(`get_number_variable`, { variableName: key}, instanceConfig);
      return response.text();
    };
    
    if (mode === 'string') {
      return getStringVariable();
    } else if (mode === 'number') {
      return getNumberVariable();
    } else {
      const finalValue: string | number = (await getStringVariable()) || (await getNumberVariable()) || undefined;
      return finalValue;
    }
  };

  /**
   * "Deletes" specified variable. Depending on its type, it'll either be set to '' or -1
   * @param key a variable name that you want to delete
   * @param persistent whether persistent or regular variable should be deleted
   */
  const del = async (key: string, persistent?: boolean) => {
    if (persistent) {
      set(key, '', true);
      set(key, -1, true);
    } else {
      set(key, '');
      set(key, -1);
    }
  };

  return {
    set,
    get,
    delete: del,
  } as Types.IState;
}
