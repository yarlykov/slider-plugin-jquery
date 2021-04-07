class Fill {
  create(options) {
    const { orientation = 'horizontal', color = 'orange' } = options;
    const scale = document.querySelector('[data-id="scale"]');

    const fillTemplate = `
      <div class="slider__fill slider__fill_${orientation} slider__fill_${color}" data-id="fill" data-scale-component="fill"></div>
    `;
    scale.innerHTML = fillTemplate;
  }
}

export default Fill;
