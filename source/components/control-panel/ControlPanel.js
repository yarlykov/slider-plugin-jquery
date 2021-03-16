import SliderComponent from '../../core/SliderComponent';
import { checkOnExtremeValues } from '../../core/utils';
import * as actions from '../../redux/actions';

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
    this.setCurrentValue(this.state.value); // refactor

    this.$on('lever:mousemove', this.setCurrentValue.bind(this));
  }

  setCurrentValue(sliderValue) {
    this.currentInput.value = Math.ceil(sliderValue.toString());
  }

  onInput(event) {
    const value = checkOnExtremeValues(Number(event.target.value));
    const data = {
      value,
      id: 'inputData',
    };

    this.$emit('input:current', value.toString());
    this.$dispatch(actions.changeSlider(data));
  }
}
ControlPanel.id = '[data-id="control-panel"]';

export default ControlPanel;
