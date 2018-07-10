import * as Util from '../src/common/util';

describe('In common utility functions', () => {
  
  describe('getUrl', () => {
    it('should build base URL', () => {
      const url = Util.getUrl({
        domain: '127.0.0.1',
        port: 8000,
        protocol: 'http'
      });
  
      expect(url).toEqual(`http://127.0.0.1:8000/`);
    });
  });

  describe('params', () => {
    const params = Util.params({
      foo: 'bar',
      bin: 'bash',
    });

    const paramsWithSharedKey = Util.params({
      foo: 'bar',
      bin: 'bash',
    }, 'mySuperSecretKey');

    it(`shouldn't start with ? character`, () => {
      expect(params[0]).not.toEqual(`?`);
    });

    it('should return parameters matching the payload', () => {
      expect(params).toEqual('foo=bar&bin=bash');
    });

    it('should have shared key property if it exists', () => {
      expect(paramsWithSharedKey).toContain('shared_key=mySuperSecretKey');
    });

    it('should end with shared key property if it exists', () => {
      const paramArray = paramsWithSharedKey.split('&');

      const lastParameter = paramArray.pop();

      expect(lastParameter).toEqual('shared_key=mySuperSecretKey');
    });
  });

  describe('buildFullUrl', () => {
    it('should return working url', () => {
      const url = Util.buildFullUrl('trigger_action', 'foo=bar', 'http://127.0.0.1:8000/');
      expect(url).toEqual('http://127.0.0.1:8000/trigger_action/?foo=bar');
    });
  });

});