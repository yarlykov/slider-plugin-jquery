class Fill {
  constructor(options = {}) {
    this.options = options;
  }

  toHTML() {
    const { orientation = '' } = this.options;

    return `
      <div class="slider__fill slider__fill_${orientation} slider__fill_orange" data-scale-component="fill"></div>
    `;
  }
}
Fill.className = 'slider__fill';

export default Fill;
