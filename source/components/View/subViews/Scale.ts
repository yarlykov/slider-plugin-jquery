import { IOptions } from '../../View/View';

class Scale {
  create(options: IOptions): void {
    const { orientation } = options;
    const sliderWrapper: HTMLElement | null = document.querySelector(
      '[data-id="slider"]',
    );

    const scaleTemplate = `
      <div class="slider__scale slider__scale_${orientation}" data-id="scale" data-scale-component="scale">
      </div>
      `;

    if (sliderWrapper === null) {
      throw new Error('Scale element is not found');
    }
    sliderWrapper.innerHTML = scaleTemplate;
  }
}

export default Scale;
