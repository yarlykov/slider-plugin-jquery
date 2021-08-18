/* eslint-disable */
import { IOptions } from '../source/components/interfaces';

class DemoBlock {
  root: JQuery<HTMLElement>;

  state: IOptions = {};

  panel!: HTMLElement;

  min!: HTMLInputElement;

  max!: HTMLInputElement;

  valueFrom!: HTMLInputElement;

  step!: HTMLInputElement;

  valueTo!: HTMLInputElement;

  orientation!: HTMLSelectElement;

  fill!: HTMLInputElement;

  range!: HTMLInputElement;

  labels!: HTMLInputElement;

  tooltips!: HTMLInputElement;

  constructor(root: JQuery<HTMLElement>) {
    this.root = root;
  }

  public init(): void {
    this.findDOMElements();
    this.pluginSetup();
    this.bindEventListeners();
  }

  private findDOMElements(): void {
    this.panel = this.root
      .get(0)
      .parentElement?.querySelector('[data-id="control-panel"]') as HTMLElement;

    this.min = this.panel.querySelector(
      '[data-title="min"]',
    ) as HTMLInputElement;
    this.max = this.panel.querySelector(
      '[data-title="max"]',
    ) as HTMLInputElement;
    this.valueFrom = this.panel.querySelector(
      '[data-title="from"]',
    ) as HTMLInputElement;
    this.step = this.panel.querySelector(
      '[data-title="step"]',
    ) as HTMLInputElement;
    this.valueTo = this.panel.querySelector(
      '[data-title="to"]',
    ) as HTMLInputElement;
    this.orientation = this.panel.querySelector(
      '[data-title="orientation"]',
    ) as HTMLSelectElement;
    this.fill = this.panel.querySelector(
      '[data-title="fill"]',
    ) as HTMLInputElement;
    this.range = this.panel.querySelector(
      '[data-title="range"]',
    ) as HTMLInputElement;
    this.labels = this.panel.querySelector(
      '[data-title="labels"]',
    ) as HTMLInputElement;
    this.tooltips = this.panel.querySelector(
      '[data-title="tooltips"]',
    ) as HTMLInputElement;
  }

  private pluginSetup(): void {
    this.state = this.root.sliderPlugin('getState');
    this.min.value = `${this.state.min}`;
    this.max.value = `${this.state.max}`;
    this.valueFrom.value = `${this.state.valueFrom}`;
    this.step.value = `${this.state.step}`;

    if (this.state.range) {
      this.valueTo.disabled = false;
      this.valueTo.value = `${this.state.valueTo}`;
    }

    this.orientation.value = `${this.state.orientation}`;
    this.fill.checked = this.state.fill as boolean;
    this.range.checked = this.state.range as boolean;
    this.labels.checked = this.state.labels as boolean;
    this.tooltips.checked = this.state.tooltips as boolean;
  }

  private bindEventListeners(): void {
    this.root.sliderPlugin('onChange', this.handleOnChangeRoot.bind(this));
    this.valueFrom.addEventListener(
      'change',
      this.handleValueFromChange.bind(this),
    );
    this.valueFrom.addEventListener(
      'keydown',
      this.handleValueFromKeydown.bind(this),
    );
    this.valueTo.addEventListener(
      'change',
      this.handleValueToChange.bind(this),
    );
    this.valueTo.addEventListener(
      'keydown',
      this.handleValueToKeydown.bind(this),
    );
    this.step.addEventListener('change', this.handleStepChange.bind(this));
    this.min.addEventListener('change', this.handleMinChange.bind(this));
    this.max.addEventListener('change', this.handleMaxChange.bind(this));
    this.orientation.addEventListener(
      'change',
      this.handleOrientationChange.bind(this),
    );
    this.fill.addEventListener('change', this.handleFillChange.bind(this));
    this.range.addEventListener('change', this.handleRangeChange.bind(this));
    this.labels.addEventListener('change', this.handleLabelsChange.bind(this));
    this.tooltips.addEventListener(
      'change',
      this.handleTooltipsChange.bind(this),
    );
  }

  private handleOnChangeRoot(event: CustomEvent): void {
    this.state = event.detail;
    if (this.state.range) {
      this.valueTo.disabled = false;
      this.valueTo.value = event.detail.valueTo;
    } else {
      this.valueTo.disabled = true;
    }
    this.valueFrom.value = event.detail.valueFrom;
    this.step.value = event.detail.step;
    this.min.value = event.detail.min;
    this.max.value = event.detail.max;
    this.orientation.value = event.detail.orientation;
    this.fill.checked = event.detail.fill;
    this.range.checked = event.detail.range;
    this.labels.checked = event.detail.labels;
    this.tooltips.checked = event.detail.tooltips;
  }

  private handleValueFromChange(): void {
    let value = 0;
    value = Number(this.valueFrom.value);
    this.root.sliderPlugin('setValue', 'valueFrom', value);
  }

  private handleValueFromKeydown(event: KeyboardEvent): void {
    const { valueFrom = 0, step = 0 } = this.state;
    const { code } = event;

    let newValue = 0;
    if (code === 'ArrowUp' || code === 'ArrowRight') {
      newValue = valueFrom + step;
      this.root.sliderPlugin('setValue', 'valueFrom', newValue);
    }
    if (code === 'ArrowDown' || code === 'ArrowLeft') {
      newValue = valueFrom - step;
      this.root.sliderPlugin('setValue', 'valueFrom', newValue);
    }
  }

  private handleValueToChange(): void {
    const value = Number(this.valueTo.value);
    this.root.sliderPlugin('setValue', 'valueTo', value);
  }

  private handleValueToKeydown(event: KeyboardEvent): void {
    const { valueTo = 0, step = 0 } = this.state;
    const { code } = event;

    let newValue = 0;
    if (code === 'ArrowUp' || code === 'ArrowRight') {
      newValue = valueTo + step;
      this.root.sliderPlugin('setValue', 'valueTo', newValue);
    }
    if (code === 'ArrowDown' || code === 'ArrowLeft') {
      newValue = valueTo - step;
      this.root.sliderPlugin('setValue', 'valueTo', newValue);
    }
  }

  private handleStepChange(): void {
    const value = Number(this.step.value);
    this.root.sliderPlugin('setValue', 'step', value);
  }

  private handleMinChange(): void {
    const value = Number(this.min.value);
    this.root.sliderPlugin('setValue', 'min', value);
  }

  private handleMaxChange(): void {
    const value = Number(this.max.value);
    this.root.sliderPlugin('setValue', 'max', value);
  }

  private handleOrientationChange(): void {
    const { value } = this.orientation;
    this.root.sliderPlugin('setValue', 'orientation', value);
  }

  private handleFillChange(): void {
    const value: boolean = this.fill.checked;
    this.root.sliderPlugin('setValue', 'fill', value);
  }

  private handleRangeChange(): void {
    const value: boolean = this.range.checked;
    this.root.sliderPlugin('setValue', 'range', value);
    if (value) {
      this.root.sliderPlugin('setValue', 'color', 'green');
    } else {
      this.root.sliderPlugin('setValue', 'color', 'orange');
    }
  }

  private handleLabelsChange(): void {
    const value: boolean = this.labels.checked;
    this.root.sliderPlugin('setValue', 'labels', value);
  }

  private handleTooltipsChange(): void {
    const value: boolean = this.tooltips.checked;
    this.root.sliderPlugin('setValue', 'tooltips', value);
  }
}

export default DemoBlock;
