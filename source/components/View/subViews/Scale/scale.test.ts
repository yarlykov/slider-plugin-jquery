import Scale from './Scale';

describe('Scale: display ', () => {
  let scale: any;
  let root: HTMLElement;

  beforeEach(() => {
    scale = new Scale();
    root = document.createElement('div');
  });

  test('should return scale HTMLElement', () => {
    expect(scale.display({}, root)).toBeDefined();
    expect(scale.display({}, root)).toBeInstanceOf(HTMLElement);
  });

  test('should create child HTMLElement in scale with class "slider"', () => {
    const sliderWrapperHTML = scale.display({}, root);

    expect(sliderWrapperHTML.innerHTML).toBe(
      '<div class="slider slider_horizontal" data-id="slider"><div class="slider__scale slider__scale_horizontal" data-id="scale"></div></div>',
    );
  });

  test('should create vertical slider', () => {
    const sliderWrapperHTML = scale.display({ orientation: 'vertical' }, root);

    expect(sliderWrapperHTML.innerHTML).toBe(
      '<div class="slider slider_vertical" data-id="slider"><div class="slider__scale slider__scale_vertical" data-id="scale"></div></div>',
    );
  });
});
