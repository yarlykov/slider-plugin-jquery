import Wrapper from './Wrapper';

describe('Wrapper:create ', () => {

  let wrapper: any;
  let root: HTMLElement;

  beforeEach(() => {
    wrapper = new Wrapper();
    root = document.createElement('div');
  })


  test('create wrapper HTMLElement', () => {
    expect(wrapper.create({}, root)).toBeInstanceOf(HTMLElement);
  });

  test('create child HTMLElement in wrapper', () => {
    expect(wrapper.create({}, root).childNodes).toHaveLength(1);
  });
});
