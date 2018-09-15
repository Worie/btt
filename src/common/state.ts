import * as CommonUtils from './util';
import * as Types from '../types/types';

/**
 * This class is responsible for managing BetterTouchTool variables.
 * It has similar usage to the ES6 Map object, but due to implementation specifics 
 * every method retunrs a promise.
 */
export default class VariableStore {
  private config: Types.IBTTConfig;

  /**
   * Used to instanitilize the variable store with given BTT config
   * @param config 
   */
  constructor(config: Types.IBTTConfig) {
    this.config = config;
  }

  /**
   * Sets the variable name to specific value
   * @param key a name of the variable that is supposed to be saved
   * @param value new value of the variable
   * @param isPersistent whether the variable should persist after BTT reboot
   */
  public set(key: string, value: string | number, isPersistent?: boolean) {
    if (typeof value !== 'number' && typeof value !== 'string') {
      throw new Error('You can only set the variable value to string or number');
    }
  
    let variableType: string = typeof value;
    if (variableType === 'number' && Number.isNaN(value as number)) {
      throw new Error('You passed NaN. Aborting');
    }
  
    const persistent: string = (isPersistent ? 'persistent_': '');
  
    const method: string = `set_${persistent}${variableType}_variable`;
  
    return CommonUtils.makeAction(method, { variableName: key, to: value }, this.config);  
  }

  /**
   * Retrieves BTT variable
   * @param key a variable name to retrieve
   * @param mode string or number. Providing this parameter makes this method more efficient
   */
  public async get(key: string, mode?: 'string' | 'number'): Promise<number | string> {
    const getStringVariable = async () => {
      const response = await CommonUtils.makeAction(`get_string_variable`, { variableName: key}, this.config);
      return response.text();
    };

    const getNumberVariable = async () => {
      const response = await CommonUtils.makeAction(`get_number_variable`, { variableName: key}, this.config);
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
  public async del(key: string, persistent?: boolean) {
    if (persistent) {
      this.set(key, '', true);
      this.set(key, -1, true);
    } else {
      this.set(key, '');
      this.set(key, -1);
    }
  };
}