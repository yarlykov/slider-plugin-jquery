import Wrapper from './Wrapper';

describe('Wrapper:create ', () => {
  test('create wrapper HTMLElement', () => {
    const wrapper = new Wrapper();
    const root = document.createElement('div');
    expect(wrapper.create({}, root)).toBeInstanceOf(HTMLElement);
  });
});
