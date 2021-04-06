import Scale from '../subViews/Scale';

class SimpleSlider {
  constructor(options, root) {
    this.options = options;
    this.root = root;

    this.init();
  }

  init() {
    this.orientation = this.options.orientation;
    this.scale = new Scale(this.orientation);

    this.createSlider();
  }

  createSlider() {
    const sliderWrapper = document.createElement('div');
    sliderWrapper.classList.add('slider', `slider_${this.orientation}`);
    sliderWrapper.setAttribute('data-id', 'slider');
    this.root.insertAdjacentHTML('afterbegin', sliderWrapper.outerHTML);

    this.scale.createScale();
    if (this.options.labels && typeof this.options.labels === 'boolean') {
      console.log('yes');
    }
  }
}

export default SimpleSlider;
