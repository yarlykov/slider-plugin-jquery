import { IOptions } from '../../View';

class Wrapper {
  create(options: IOptions, root: HTMLElement): HTMLElement {
    const { orientation = 'horizontal' } = options;

    const sliderWrapper = document.createElement('div');
    sliderWrapper.classList.add('slider', `slider_${orientation}`);
    sliderWrapper.setAttribute('data-id', 'slider');
    root.insertAdjacentHTML('afterbegin', sliderWrapper.outerHTML);
    return root;
  }
}

export default Wrapper;
