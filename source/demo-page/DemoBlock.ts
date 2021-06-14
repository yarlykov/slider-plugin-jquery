import { IOptions } from '../components/interfaces';

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

    this.init();
  }

  init() {
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

    this.root.sliderPlugin('onChange', (event: CustomEvent) => {
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
    });

    this.valueFrom.addEventListener('change', () => {
      let value = 0;
      value = Number(this.valueFrom.value);
      this.root.sliderPlugin('setValue', 'valueFrom', value);
    });

    this.valueFrom.addEventListener('keydown', (event: KeyboardEvent) => {
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
    });

    this.valueTo.addEventListener('keydown', (event: KeyboardEvent) => {
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
    });

    this.step.addEventListener('change', () => {
      const value = Number(this.step.value);
      this.root.sliderPlugin('setValue', 'step', value);
    });

    this.min.addEventListener('change', () => {
      const value = Number(this.min.value);
      this.root.sliderPlugin('setValue', 'min', value);
    });

    this.max.addEventListener('change', () => {
      const value = Number(this.max.value);
      this.root.sliderPlugin('setValue', 'max', value);
    });

    this.valueTo.addEventListener('change', () => {
      const value = Number(this.valueTo.value);
      this.root.sliderPlugin('setValue', 'valueTo', value);
    });

    this.orientation.addEventListener('change', () => {
      const { value } = this.orientation;
      this.root.sliderPlugin('setValue', 'orientation', value);
    });

    this.fill.addEventListener('change', () => {
      const value: boolean = this.fill.checked;
      this.root.sliderPlugin('setValue', 'fill', value);
    });

    this.range.addEventListener('change', () => {
      const value: boolean = this.range.checked;
      this.root.sliderPlugin('setValue', 'range', value);
    });

    this.labels.addEventListener('change', () => {
      const value: boolean = this.labels.checked;
      this.root.sliderPlugin('setValue', 'labels', value);
    });

    this.tooltips.addEventListener('change', () => {
      const value: boolean = this.tooltips.checked;
      this.root.sliderPlugin('setValue', 'tooltips', value);
    });
  }
}

export default DemoBlock;
