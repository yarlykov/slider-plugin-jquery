import View from '../View';

class Wrapper extends View {
  constructor(root, options) {
    super(root, options);
    this.root = root;
    this.orientation = options.display.type;
    // console.log('Wrapper', this.orientation);
  }

  render() {
    const slider = document.createElement('div');
    slider.classList.add('slider', `slider_${this.orientation}`);
    slider.setAttribute('data-id', 'slider');

    this.root.insertAdjacentHTML('afterbegin', slider.outerHTML);
  }
}

export default Wrapper;
