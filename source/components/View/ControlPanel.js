
class ControlPanel {
  constructor(node) {
    this.$el = node;

    this._init();
  }

  _init() {
    this.$currentSliderValue = this.$el.querySelector('.control-panel__input');
  }
}

const mainNode = document.querySelector('.control-panel');

const panel = new ControlPanel(mainNode)
window.ControlPanel = panel;