class View {
  constructor(selector) {
    this.nativeElement = selector;
  }

  render() {
    const template = `
      <div class="slider slider_horizontal" data-id="slider" data-slider="horizontal">
        <div class="slider__scale slider__scale_horizontal" data-id="scale" data-scale-component="scale">
          <div class="slider__fill slider__fill_horizontal slider__fill_horizontal_ slider__fill_orange" data-id="fill" data-scale-component="fill"></div>
          <div class="slider__lever slider__lever_horizontal slider__lever_orange" data-id="lever">
            <div class="slider__tooltip slider__tooltip_horizontal slider__tooltip_orange" data-id="tooltip"><span class="tooltip__value" data-id="tooltip-value">42 ¥</span>
              <div class="slider__tooltip_arrow"></div>
            </div>
          </div>
          <div class="slider__labels slider__labels_horizontal" data-id="labels">
            <div class="slider__labels-item">0</div>
            <div class="slider__labels-item">25</div>
            <div class="slider__labels-item">50</div>
            <div class="slider__labels-item">75</div>
            <div class="slider__labels-item">100</div>
          </div>
        </div>
      </div>`;

    this.nativeElement.insertAdjacentHTML('afterbegin', template);
  }
}

export default View;
