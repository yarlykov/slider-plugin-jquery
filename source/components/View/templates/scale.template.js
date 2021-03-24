function createScale(orientation = 'horizontal') {
  return `
      <div class="slider__scale slider__scale_${orientation}" data-id="scale" data-scale-component="scale">
        <div class="slider__fill slider__fill_${orientation} slider__fill_orange" data-id="fill"
        data-scale-component="fill"></div>
      </div>
    `;
}

export default createScale;
