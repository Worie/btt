import { Btt, AppConfig } from '../src';

describe('Trigger shortcut action', () => {
  const config: AppConfig = {
    domain: '127.0.0.1',
    port: 8000,
    protocol: 'http',
    version: '2.525',
  };
  
  const btt = new Btt(config);

  const action = btt.triggerShortcut('cmd+space');
 
  // there's no way to determine whether action actually works, so I'm doing a simple check on input data and result payload
  it('should match url', () => {
    expect(btt.triggerShortcut('cmd+space').url).toEqual('http://127.0.0.1:8000/trigger_action/?json=%7B%22BTTPredefinedActionType%22%3A-1%2C%22BTTEnabled2%22%3A1%2C%22BTTEnabled%22%3A1%2C%22BTTShortcutToSend%22%3A%2255%2C49%22%7D');
  });

});