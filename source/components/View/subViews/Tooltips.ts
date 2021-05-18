import SliderComponent from './SliderComponent';

class Tooltips extends SliderComponent {
  display() {
    const { tooltips = false, range = false } = this.options;

    const knob = this.root.querySelector('[data-id="knob"]');

    if (!knob) throw new Error('Knob element is not found');

    if (tooltips && range) {
      const firstKnob = new FirstTooltip(this.options, this.root);
      firstKnob.display();
      const secondTooltip = new SecondTooltip(this.options, this.root);
      secondTooltip.display();
    } else if (tooltips) {
      knob.insertAdjacentHTML('afterbegin', this.getTemplate());
    }
  }

  update(data: any) {
    // убрать any
    const tooltip = this.root.querySelector(
      '[data-id="tooltip-value"]',
    ) as HTMLElement;

    if (data.key === 'currentValue' && tooltip) {
      tooltip.innerText = `${data.currentValue}`;
    }
  }

  getTemplate() {
    const { orientation, color, currentValue } = this.options;
    const verticalTooltipClass =
      orientation === 'vertical' ? 'slider__tooltip_arrow_vertical' : '';

    return `
      <div class="slider__tooltip slider__tooltip_${orientation} slider__tooltip_${color}" 
      data-id="tooltip">
        <span class="tooltip__value" data-id="tooltip-value">${currentValue}</span>
        <div class="slider__tooltip_arrow ${verticalTooltipClass}"></div>
      </div>
    `;
  }
}

class FirstTooltip extends SliderComponent {
  display() {
    const firstKnob = this.root.querySelector('[data-knob="first"]');

    if (!firstKnob) throw new Error('First knob element is not found');
    firstKnob.insertAdjacentHTML('afterbegin', this.getTemplate());
  }

  getTemplate() {
    const { orientation, color, rangeMin } = this.options;
    const verticalTooltipClass =
      orientation === 'vertical' ? 'slider__tooltip_arrow_vertical' : '';

    return `
      <div class="slider__tooltip slider__tooltip_${orientation} slider__tooltip_${color}" 
      data-id="tooltip" data-tooltip="first">
        <span class="tooltip__value" data-id="tooltip-value">${rangeMin}</span>
        <div class="slider__tooltip_arrow ${verticalTooltipClass}"></div>
      </div>
    `;
  }
}

class SecondTooltip extends SliderComponent {
  display() {
    const secondKnob = this.root.querySelector('[data-knob="second"]');

    if (!secondKnob) throw new Error('First knob element is not found');
    secondKnob.insertAdjacentHTML('afterbegin', this.getTemplate());
  }

  getTemplate() {
    const { orientation, color, rangeMax } = this.options;
    const verticalTooltipClass =
      orientation === 'vertical' ? 'slider__tooltip_arrow_vertical' : '';

    return `
      <div class="slider__tooltip slider__tooltip_${orientation} slider__tooltip_${color}" 
      data-id="tooltip" data-tooltip="first">
        <span class="tooltip__value" data-id="tooltip-value">${rangeMax}</span>
        <div class="slider__tooltip_arrow ${verticalTooltipClass}"></div>
      </div>
    `;
  }
}

export default Tooltips;
