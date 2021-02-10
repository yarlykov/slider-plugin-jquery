import SliderComponent from '../../core/SliderComponent';

class ControlPanel extends SliderComponent {
  constructor($root, options) {
    super($root, {
      name: 'ControlPanel',
      listeners: ['input'],
      ...options,
    });
  }

  onInput(event) {
  }
}
ControlPanel.className = 'control-panel';

export default ControlPanel;
