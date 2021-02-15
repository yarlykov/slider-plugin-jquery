import SliderComponent from '../../core/SliderComponent';
import $ from '../../core/dom';

class ControlPanel extends SliderComponent {
  constructor($root, options) {
    super($root, {
      name: 'ControlPanel',
      listeners: ['input'],
      ...options,
    });
    this.$root = $root;
  }

  init() {
    super.init();
    this.currentInput = this.$root.find('[data-title="current"]');
    this.subscribe('lever:mousemove', (currentPosition) => {
      this.currentInput.value = Math.ceil(currentPosition.toString());
    });
  }

  onInput(event) {
    this.$emit('input:current', event.target.value);
  }
}
ControlPanel.id = '[data-id="control-panel"]';

export default ControlPanel;
