import Slider from '../SliderComponent';

class Scale extends Slider {
  _element!: string;

  display() {
    this.root.innerHTML = '';
    this.root.insertAdjacentHTML('afterbegin', this.element);
  }

  get element() {
    if (this._element) {
      console.log('i am save');
      return this._element;
    }

    this._element = this.getTemplate();
    return this._element;
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
