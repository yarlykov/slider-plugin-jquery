import createScale from './templates/scale.template';

class View {
  constructor(selector) {
    this.nativeElement = selector;
  }

  render() {
    const slider = document.createElement('div');
    slider.classList.add('slider', 'slider_horizontal');
    slider.setAttribute('data-id', 'slider');
    slider.innerHTML = createScale();
    this.nativeElement.append(slider);
  }
}

export default View;
