import { IOptions } from '../../View';

class Scale {
  // createElement(tag: string, className:string, attr: {name: string, value: string}): HTMLElement {
  //   const element = document.createElement(tag);
  //   if (className) element.classList.add(className);
  //   if (attr) element.setAttribute(attr.name, attr.value);

  //   return element;
  // }

  display(options: IOptions, root: HTMLElement): HTMLElement {
    const { orientation = 'horizontal' } = options;

    const sliderWrapperHTML = document.createElement('div');
    sliderWrapperHTML.classList.add('slider', `slider_${orientation}`);
    sliderWrapperHTML.setAttribute('data-id', 'slider');

    const scaleHTML = document.createElement('div');
    scaleHTML.classList.add('slider__scale', `slider__scale_${orientation}`);
    scaleHTML.setAttribute('data-id', 'scale');

    sliderWrapperHTML.insertAdjacentElement('afterbegin', scaleHTML);
    root.insertAdjacentHTML('afterbegin', sliderWrapperHTML.outerHTML);
    return root;
  }
}

export default Scale;
