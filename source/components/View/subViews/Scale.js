class Scale {
  create(options) {
    const { orientation } = options;
    const sliderWrapper = document.querySelector('[data-id="slider"]');

    const scaleTemplate = `
      <div class="slider__scale slider__scale_${orientation}" data-id="scale" data-scale-component="scale">
      </div>
      `;
    sliderWrapper.innerHTML = scaleTemplate;
  }
}

export default Scale;
