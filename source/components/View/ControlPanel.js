class ControlPanel {
  constructor(node) {
    this.$el = node;

    this._init();
    this.record();
  }

  _init() {
    this.$currentSliderValue = this.$el.querySelector('.control-panel__input');
  }

  record(sliderValue) {
    this.$currentSliderValue.value = sliderValue || 7;
  }
}

const mainNode = document.querySelector('.control-panel');

const panel = new ControlPanel(mainNode);
window.ControlPanel = panel;
