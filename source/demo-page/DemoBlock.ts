import { IOptions } from '../components/interfaces';

class DemoBlock {
  root: JQuery<HTMLElement>;
  state: IOptions = {};
  panel!: HTMLElement;
  step!: HTMLInputElement;
  min!: HTMLInputElement;
  max!: HTMLInputElement;
  rangeMin!: HTMLInputElement;
  rangeMax!: HTMLInputElement;
  current!: HTMLInputElement;

  constructor(root: JQuery<HTMLElement>) {
    this.root = root;
    
    this.init();
  }

  init() {
    this.panel = this.root
      .get(0)
      .parentElement?.querySelector('[data-id="control-panel"]') as HTMLElement;

    this.current = this.panel.querySelector(
      '[data-title="current"]',
    ) as HTMLInputElement;
    this.step = this.panel.querySelector(
      '[data-title="step"]',
    ) as HTMLInputElement;
    this.min = this.panel.querySelector(
      '[data-title="scale-min"]',
    ) as HTMLInputElement;
    this.max = this.panel.querySelector(
      '[data-title="scale-max"]',
    ) as HTMLInputElement;
    this.rangeMin = this.panel.querySelector(
      '[data-title="range-min"]',
    ) as HTMLInputElement;
    this.rangeMax = this.panel.querySelector(
      '[data-title="range-max"]',
    ) as HTMLInputElement;

    this.root.sliderPlugin('onChange', (event: CustomEvent) => {
      this.state = event.detail;
      if (this.state.range) {
        this.current.disabled = true;
        this.rangeMin.disabled = false;
        this.rangeMin.value = event.detail.rangeMin;
        this.rangeMax.disabled = false;
        this.rangeMax.value = event.detail.rangeMax;
      } else {
        this.current.disabled = false;
        this.rangeMin.disabled = true;
        this.rangeMax.disabled = true;
      }
      this.current.value = event.detail.currentValue;
      this.step.value = event.detail.step;
      this.min.value = event.detail.min;
      this.max.value = event.detail.max;
    });

    this.current.addEventListener('change', () => {
      const value: number = Number(this.current.value);
      this.root.sliderPlugin('setValue', 'currentValue', value);
    });

    this.step.addEventListener('change', () => {
      const value: number = Number(this.step.value);
      this.root.sliderPlugin('setValue', 'step', value);
    });

    this.min.addEventListener('change', () => {
      const value: number = Number(this.min.value);
      this.root.sliderPlugin('setValue', 'min', value);
    });

    this.max.addEventListener('change', () => {
      const value: number = Number(this.max.value);
      this.root.sliderPlugin('setValue', 'max', value);
    });

    this.rangeMax.addEventListener('change', () => {
      const value: number = Number(this.rangeMax.value);
      this.root.sliderPlugin('setValue', 'rangeMax', value);
    });

    this.rangeMin.addEventListener('change', () => {
      const value: number = Number(this.rangeMin.value);
      this.root.sliderPlugin('setValue', 'rangeMax', value);
    });
  }
}

export default DemoBlock;
