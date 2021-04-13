import { OptionsInterface } from '../../View/View';

class Wrapper {
  create(options: OptionsInterface, root: HTMLElement): void {
    const { orientation } = options;

    const sliderWrapper = document.createElement('div');
    sliderWrapper.classList.add('slider', `slider_${orientation}`);
    sliderWrapper.setAttribute('data-id', 'slider');
    root.insertAdjacentHTML('afterbegin', sliderWrapper.outerHTML);
  }
}

export default Wrapper;
