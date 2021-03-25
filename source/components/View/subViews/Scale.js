import bemName from '../../../bemName';

class Scale {
  constructor(options = {}) {
    this.options = options;

    this.init();
  }

  init() {
    this.orientation = this.options.display.type;
    this.color = this.options.display.color;

    this.createClassName();
  }

  createClassName() {
    this.className = {
      scale: bemName({ b: 'scale' }),
      fill: bemName({ b: 'fill' }),
      sliderScale: bemName({ b: 'slider', e: 'scale' }),
      sliderFill: bemName({ b: 'slider', e: 'fill' }),
      sliderFillColor: bemName({ b: 'slider', e: 'fill', m: this.color }),
      sliderScaleOrientation: bemName({ b: 'slider', e: 'scale', m: this.orientation }),
      sliderFillOrientation: bemName({ b: 'slider', e: 'fill', m: this.orientation }),
    };
  }

  getSimpleTemplate() {
    const {
      scale,
      fill,
      sliderScale,
      sliderFill,
      sliderFillColor,
      sliderScaleOrientation,
      sliderFillOrientation,
    } = this.className;

    return `
      <div class="${sliderScale} ${sliderScaleOrientation}" data-id="${scale}" data-scale-component="scale">
        <div class="${sliderFill} ${sliderFillOrientation} ${sliderFillColor}" data-id="${fill}"
        data-scale-component="${fill}"></div>
      </div>
      `;
  }
}

export default Scale;
