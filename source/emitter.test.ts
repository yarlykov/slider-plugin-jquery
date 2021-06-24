import Emitter from './Emitter';

describe('Emitter:', () => {
  let emitter: Emitter;

  beforeEach(() => {
    emitter = new Emitter();
  });

  test('should be defined', () => {
    expect(emitter).toBeInstanceOf(Emitter);
  });

  test("should return false if the observer doesn't exist", () => {
    expect(emitter.emit('observer', {})).toBeFalsy();
  });

  test('should return truthy if the observer exits', () => {
    emitter.subscribe('observer', () => true);
    expect(emitter.emit('observer', {})).toBeTruthy();
  });

  test('should must unsubscribe', () => {
    const eventCallback = jest.fn();
    const observers = {
      unsubscribe: [],
    };
    emitter.subscribe('unsubscribe', eventCallback);
    expect(emitter.unsubscribe('unsubscribe', eventCallback)).toEqual(
      observers,
    );
  });
});
