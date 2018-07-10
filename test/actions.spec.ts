import { Btt } from '../src/index';

describe('Trigger shortcut action', () => {
  const btt = new Btt({
    domain: '127.0.0.1',
    port: 8000,
    protocol: 'http',
    version: '2.525',
  });

  const action = btt.triggerShortcut('cmd+space');

  // bieda testy
  it('should match url', () => {
    expect(btt.triggerShortcut('cmd+space').url).toEqual('http://127.0.0.1:8000/trigger_action/?json=%7B%22BTTPredefinedActionType%22%3A-1%2C%22BTTShortcutToSend%22%3A%2255%2C49%22%2C%22BTTEnabled2%22%3A1%2C%22BTTEnabled%22%3A1%7D');
  });

});