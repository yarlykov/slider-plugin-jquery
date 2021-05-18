import Slider from '../SliderComponent';

class Scale extends Slider {
  private element!: string;

  display() {
    this.root.innerHTML = '';
    this.root.insertAdjacentHTML('afterbegin', this.getElement());
  }

  getElement() {
    if (this.element) {
      console.log('i am save');
      return this.element;
    }

    this.element = this.getTemplate();
    return this.element;
  }

  getTemplate() {
    const { orientation } = this.options;
    return `
      <div class="slider slider_${orientation}">
        <div class="slider__scale slider__scale_${orientation}" data-id="scale"></div>
      </div>
    `;
  }
}

export default Scale;
