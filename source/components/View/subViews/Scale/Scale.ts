import { createElement } from '../../../../utils/utils';
import { IOptions } from '../../../interfaces';

class Scale {
  public display(options: IOptions, root: HTMLElement): HTMLElement {
    const { orientation } = options;
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
