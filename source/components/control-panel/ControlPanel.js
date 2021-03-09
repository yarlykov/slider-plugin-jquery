import SliderComponent from '../../core/SliderComponent';
import { checkOnExtremeValues } from '../../core/utils';

class ControlPanel extends SliderComponent {
  constructor($root, options) {
    super($root, {
      name: 'ControlPanel',
      listeners: ['input'],
      ...options,
    });
  }

  init() {
    super.init();
    this.currentInput = this.$root.find('[data-title="current"]');
    this.$on('lever:mousemove', this.setCurrentValue.bind(this));

    this.$subscribe((state) => {
      console.log('ControlPanelState:', state);
    });
  }

  setCurrentValue(sliderValue) {
    this.currentInput.value = Math.ceil(sliderValue.toString());
  }

  onInput(event) {
    const value = checkOnExtremeValues(Number(event.target.value));
    this.$emit('input:current', value.toString());

    this.$dispatch({ type: 'TEST' });
  }
}
ControlPanel.id = '[data-id="control-panel"]';

export default ControlPanel;
