class Scale {
  constructor(orientation = 'horizontal') {
    this.orientation = orientation;
  }

  createScale() {
    const sliderWrapper = document.querySelector('[data-id="slider"]');

    const scaleTemplate = `
      <div class="slider__scale slider__scale_${this.orientation}" data-id="scale" data-scale-component="scale">
      </div>
      `;
    sliderWrapper.innerHTML = scaleTemplate;
  }
}

export default Scale;
