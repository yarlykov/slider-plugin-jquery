class SimpleSlider {
  constructor(options, root) {
    this.options = options;
    this.root = root;

    this.init();
  }

  init() {
    this.orientation = this.options.orientation;
    this.color = this.options.color;

    this.createSlider();
  }

  createSlider() {
    // const sliderWrapper = document.createElement('div');
    // sliderWrapper.classList.add('slider', `slider_${this.orientation}`);
    // sliderWrapper.setAttribute('data-id', 'slider');
    // this.root.insertAdjacentHTML('afterbegin', sliderWrapper.outerHTML);

    // const sliderElements = this.options.elements;
    // sliderElements.forEach((Element) => {
    //   const element = new Element();
    //   element.create(this.options);
    // });
  }
}

export default SimpleSlider;
