import bemName from '../../../bemName';

class Knobs {
  constructor(options) {
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
      knob: bemName({b: 'knob'}),
      sliderKnob: bemName({ b: 'slider', e: 'knob' }),
      sliderKnobColor: bemName({ b: 'slider', e: 'knob', m: this.color }),
      sliderKnobOrientation: bemName({ b: 'slider', e: 'knob', m: this.orientation }),
    };
  }

  getSimpleTemplate() {
    const {
      knob,
      sliderKnob,
      sliderKnobColor,
      sliderKnobOrientation,
    } = this.className;

    return `
      <div class="${sliderKnob} ${sliderKnobOrientation} ${sliderKnobColor} " data-id="${knob}">
      </div>
    `;
  }
}

export default Knobs;
