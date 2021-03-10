import SliderComponent from '../../core/SliderComponent';
import { checkOnExtremeValues, storage } from '../../core/utils';

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
    this.setCurrentValue(this.state.currentValue);

    this.$on('lever:mousemove', this.setCurrentValue.bind(this));

    this.$subscribe((state) => {
      console.log('State:', state);
    });
  }

  setCurrentValue(sliderValue) {
    this.currentInput.value = Math.ceil(sliderValue.toString());
  }

  onInput(event) {
    const value = checkOnExtremeValues(Number(event.target.value));
    const data = {
      value,
      id: 'currentPosition',
    };

    this.$emit('input:current', value.toString());
    this.$dispatch({ type: 'SLIDER_POSITION_CHANGE', data });
  }
}
ControlPanel.id = '[data-id="control-panel"]';

export default ControlPanel;
