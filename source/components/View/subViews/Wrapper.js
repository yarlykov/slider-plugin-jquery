import View from '../View';

class Wrapper extends View {
  render() {
    const slider = document.createElement('div');
    slider.classList.add('slider', 'slider_horizontal');
    slider.setAttribute('data-id', 'slider');

    this.root.insertAdjacentHTML('afterbegin', slider.outerHTML);
  }
}

export default Wrapper;
