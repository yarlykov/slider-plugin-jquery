import { OptionsInterface } from '../../View';

class Wrapper {
  create(options: OptionsInterface, root: HTMLElement): HTMLElement {
    const { orientation = 'horizontal' } = options;

    const sliderWrapper = document.createElement('div');
    sliderWrapper.classList.add('slider', `slider_${orientation}`);
    sliderWrapper.setAttribute('data-id', 'slider');
    root.insertAdjacentHTML('afterbegin', sliderWrapper.outerHTML);
    return root;
  }
}

export default Wrapper;
