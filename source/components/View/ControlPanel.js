class ControlPanel {
  constructor(node = []) {
    this.$el = node;

    this._init();
    this._setup();
  }

  _init() {
    this.$mainControl = document.querySelector('.control-panel');
    this.$controls = this.$mainControl.querySelectorAll('.control-panel__input');

    const [scaleMin, scaleMax, current, step] = this.$controls;
    this.$current = current;

    this.$currentSliderValue = document.querySelector('.control-panel__input');
  }

  _setup() {
    this.bindEventListeners();
    this.addEventListeners();
  }

  addEventListeners() {
    this.$mainControl.addEventListener('input', this.handleControlChange);
  }

  bindEventListeners() {
    this.handleControlChange = this.handleControlChange.bind(this);
  }

  handleControlChange(inputEvent) {
    const { title } = inputEvent.target.dataset;

    if (title === 'current') {
      console.log('i am work');
    }
  }

  setCurrentValue(sliderCurrentValue) {
    this.$current.value = sliderCurrentValue;
  }
}
export default ControlPanel;

const mainNode = document.querySelector('.control-panel');

const panel = new ControlPanel(mainNode);
window.ControlPanel = panel;
