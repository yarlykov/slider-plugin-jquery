import Wrapper from './Wrapper';

describe('Wrapper:create ', () => {
  let wrapper: any;
  let root: HTMLElement;

  beforeEach(() => {
    wrapper = new Wrapper();
    root = document.createElement('div');
  });

  test('should return wrapper HTMLElement', () => {
    expect(wrapper.create({}, root)).toBeDefined();
    expect(wrapper.create({}, root)).toBeInstanceOf(HTMLElement);
  });

  test('should create child HTMLElement in wrapper with class "slider"', () => {
    const wrapperNode = wrapper.create({}, root);

    expect(wrapperNode.innerHTML).toBe(
      '<div class="slider slider_horizontal" data-id="slider"></div>',
    );
  });

  test('should create vertical slider', () => {
    const wrapperNode = wrapper.create({ orientation: 'vertical' }, root);

    expect(wrapperNode.innerHTML).toBe(
      '<div class="slider slider_vertical" data-id="slider"></div>',
    );
  });
});
