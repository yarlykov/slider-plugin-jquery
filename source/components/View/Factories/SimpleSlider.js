import bemName from '../../../bemName';
import Scale from '../subViews/Scale';

class SimpleSlider {
  constructor(options) {
    this.options = options;

    this.init();
  }

  init() {
    const scale = new Scale(this.options);
    this.scale = scale.getSimpleTemplate();
    this.orientation = this.options.display.type;

    this.createClassName();
  }

  createClassName() {
    this.className = {
      slider: bemName({ b: 'slider' }),
      sliderOrientation: bemName({ b: 'slider', m: this.orientation }),
    };
  }

  getTemplate() {
    const {
      slider,
      sliderOrientation,
    } = this.className;

    const template = `
      <div class="${slider} ${sliderOrientation}"data-id="${slider}">
        ${this.scale}
      </div>
    `;
    return template;
  }
}

export default SimpleSlider;
