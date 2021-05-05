import { createElement } from '../../../../utils/utils';

class Scale {
  public display(orientation: string, root: HTMLElement): HTMLElement {
    const sliderWrapperHTML = createElement('div', [
      'slider',
      `slider_${orientation}`,
    ]);
    sliderWrapperHTML.setAttribute('data-id', 'slider');

    const scaleHTML = createElement('div', [
      'slider__scale',
      `slider__scale_${orientation}`,
    ]);
    scaleHTML.setAttribute('data-id', 'scale');

    sliderWrapperHTML.append(scaleHTML);
    root.append(sliderWrapperHTML);
    return root;
  }
}

export default Scale;
