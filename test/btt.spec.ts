import { Btt } from '../src/index';

describe('btt', () => {
  const btt = new Btt({
    domain: '127.0.0.1',
    port: 8000,
    protocol: 'http',
    version: '2.525',
  });

  it('Should return an instance', () => {
    expect(btt).toBeInstanceOf(Btt);
  });

  it('Should have an addEventListener method', () => {
    expect(btt.addEventListener).toBeDefined;
  });

  it('Should have removeEventListner method', () => {
    expect(btt.removeEventListener).toBeDefined;
  });
});