import { createElement } from './utils';

describe('Utils: createElement', () => {
  test('should be defined', () => {
    expect(createElement('div')).toBeDefined();
  });

  test('should be create <div></div> element', () => {
    const tag = createElement('div');
    expect(tag).toBeInstanceOf(HTMLDivElement);
  });

  test('should be create <div></div> element with class "slider"', () => {
    const tag = createElement('div', ['slider']);
    expect(tag.outerHTML).toEqual('<div class="slider"></div>');
  });

  test('should be create <div></div> element with some classes', () => {
    const tag = createElement('div', ['slider', 'slider__wrapper']);
    expect(tag.outerHTML).toEqual('<div class="slider slider__wrapper"></div>');
  });
});
