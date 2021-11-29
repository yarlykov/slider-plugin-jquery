/* eslint-disable */
import { IOptions } from '../source/components/interfaces';

type InputElement = HTMLInputElement | null | undefined;

class DemoBlock {
  root: JQuery<HTMLElement>;

  state: IOptions = {};

  panel!: InputElement;

  min!: InputElement;

  max!: InputElement;

  valueFrom!: InputElement;

  step!: InputElement;

  valueTo!: InputElement;

  orientation!: InputElement;

  fill!: InputElement;

  range!: InputElement;

  labels!: InputElement;

  tooltips!: InputElement;

  constructor(root: JQuery<HTMLElement>) {
    this.root = root;

    this.findInputElements();
    this.pluginSetup();
    this.bindEventListeners();
  }

  private findInputElements(): void {
    this.panel = this.root
      .get(0)
      .parentElement?.querySelector('[data-id="control-panel"]');

    if (this.panel) {
      this.min = <HTMLInputElement>(
        this.panel.querySelector('[data-title="min"]')
      );
      this.max = <HTMLInputElement>(
        this.panel.querySelector('[data-title="max"]')
      );
      this.valueFrom = <HTMLInputElement>(
        this.panel.querySelector('[data-title="from"]')
      );
      this.step = <HTMLInputElement>(
        this.panel.querySelector('[data-title="step"]')
      );
      this.valueTo = <HTMLInputElement>(
        this.panel.querySelector('[data-title="to"]')
      );
      this.orientation = <HTMLInputElement>(
        this.panel.querySelector('[data-title="orientation"]')
      );
      this.fill = <HTMLInputElement>(
        this.panel.querySelector('[data-title="fill"]')
      );
      this.range = <HTMLInputElement>(
        this.panel.querySelector('[data-title="range"]')
      );
      this.labels = <HTMLInputElement>(
        this.panel.querySelector('[data-title="labels"]')
      );
      this.tooltips = <HTMLInputElement>(
        this.panel.querySelector('[data-title="tooltips"]')
      );
    }
  }

  private pluginSetup(): void {
    this.state = this.root.sliderPlugin('getState');
    if (this.min) this.min.value = `${this.state.min}`;
    if (this.max) this.max.value = `${this.state.max}`;
    if (this.valueFrom) this.valueFrom.value = `${this.state.valueFrom}`;
    if (this.step) this.step.value = `${this.state.step}`;

    if (this.state.range && this.valueTo) {
      this.valueTo.disabled = false;
      this.valueTo.value = `${this.state.valueTo}`;
    }

    if (this.orientation) this.orientation.value = `${this.state.orientation}`;
    if (this.fill && this.state.fill) this.fill.checked = this.state.fill;
    if (this.range && this.state.range) this.range.checked = this.state.range;
    if (this.labels && this.state.labels)
      this.labels.checked = this.state.labels;
    if (this.tooltips && this.state.tooltips)
      this.tooltips.checked = this.state.tooltips;
  }

  private bindEventListeners(): void {
    this.root.sliderPlugin('onChange', this.handleOnChangeRoot.bind(this));
    if (this.valueFrom) {
      this.valueFrom.addEventListener(
        'change',
        this.handleValueFromChange.bind(this),
      );
      this.valueFrom.addEventListener(
        'keydown',
        this.handleValueFromKeydown.bind(this),
      );
    }
    if (this.valueTo) {
      this.valueTo.addEventListener(
        'change',
        this.handleValueToChange.bind(this),
      );
      this.valueTo.addEventListener(
        'keydown',
        this.handleValueToKeydown.bind(this),
      );
    }
    if (this.step)
      this.step.addEventListener('change', this.handleStepChange.bind(this));
    if (this.min)
      this.min.addEventListener('change', this.handleMinChange.bind(this));
    if (this.max)
      this.max.addEventListener('change', this.handleMaxChange.bind(this));
    if (this.orientation)
      this.orientation.addEventListener(
        'change',
        this.handleOrientationChange.bind(this),
      );
    if (this.fill)
      this.fill.addEventListener('change', this.handleFillChange.bind(this));
    if (this.range)
      this.range.addEventListener('change', this.handleRangeChange.bind(this));
    if (this.labels)
      this.labels.addEventListener(
        'change',
        this.handleLabelsChange.bind(this),
      );
    if (this.tooltips)
      this.tooltips.addEventListener(
        'change',
        this.handleTooltipsChange.bind(this),
      );
  }

  private handleOnChangeRoot(event: CustomEvent): void {
    this.state = event.detail;
    const {
      valueTo,
      valueFrom,
      step,
      min,
      max,
      orientation,
      fill,
      range,
      labels,
      tooltips,
    } = event.detail;
    if (this.state.range && this.valueTo) {
      this.valueTo.disabled = false;
      this.valueTo.value = valueTo;
    } else if (this.valueTo) {
      this.valueTo.disabled = true;
    }
    if (this.valueFrom) this.valueFrom.value = valueFrom;
    if (this.step) this.step.value = step;
    if (this.min) this.min.value = min;
    if (this.max) this.max.value = max;
    if (this.orientation) this.orientation.value = orientation;
    if (this.fill) this.fill.checked = fill;
    if (this.range) this.range.checked = range;
    if (this.labels) this.labels.checked = labels;
    if (this.tooltips) this.tooltips.checked = tooltips;
  }

  private handleValueFromChange(): void {
    if (this.valueFrom) {
      this.root.sliderPlugin(
        'setValue',
        'valueFrom',
        Number(this.valueFrom.value),
      );
    }
  }

  private handleValueFromKeydown(event: KeyboardEvent): void {
    const { valueFrom = 0, step = 0 } = this.state;
    const { code } = event;

    if (code === 'ArrowUp' || code === 'ArrowRight') {
      const newValue = valueFrom + step;
      this.root.sliderPlugin('setValue', 'valueFrom', newValue);
    }
    if (code === 'ArrowDown' || code === 'ArrowLeft') {
      const newValue = valueFrom - step;
      this.root.sliderPlugin('setValue', 'valueFrom', newValue);
    }
  }

  private handleValueToChange(): void {
    if (this.valueTo) {
      this.root.sliderPlugin('setValue', 'valueTo', Number(this.valueTo.value));
    }
  }

  private handleValueToKeydown(event: KeyboardEvent): void {
    const { valueTo = 0, step = 0 } = this.state;
    const { code } = event;

    if (code === 'ArrowUp' || code === 'ArrowRight') {
      const newValue = valueTo + step;
      this.root.sliderPlugin('setValue', 'valueTo', newValue);
    }
    if (code === 'ArrowDown' || code === 'ArrowLeft') {
      const newValue = valueTo - step;
      this.root.sliderPlugin('setValue', 'valueTo', newValue);
    }
  }

  private handleStepChange(): void {
    if (this.step) {
      this.root.sliderPlugin('setValue', 'step', Number(this.step.value));
    }
  }

  private handleMinChange(): void {
    if (this.min) {
      this.root.sliderPlugin('setValue', 'min', Number(this.min.value));
    }
  }

  private handleMaxChange(): void {
    if (this.max) {
      this.root.sliderPlugin('setValue', 'max', Number(this.max.value));
    }
  }

  private handleOrientationChange(): void {
    if (this.orientation) {
      this.root.sliderPlugin('setValue', 'orientation', this.orientation.value);
    }
  }

  private handleFillChange(): void {
    if (this.fill) {
      this.root.sliderPlugin('setValue', 'fill', this.fill.checked);
    }
  }

  private handleRangeChange(): void {
    if (this.range) {
      this.root.sliderPlugin('setValue', 'range', this.range.checked);
      if (this.range.checked) {
        this.root.sliderPlugin('setValue', 'color', 'green');
      } else {
        this.root.sliderPlugin('setValue', 'color', 'orange');
      }
    }
  }

  private handleLabelsChange(): void {
    if (this.labels) {
      this.root.sliderPlugin('setValue', 'labels', this.labels.checked);
    }
  }

  private handleTooltipsChange(): void {
    if (this.tooltips) {
      this.root.sliderPlugin('setValue', 'tooltips', this.tooltips.checked);
    }
  }
}

export default DemoBlock;
