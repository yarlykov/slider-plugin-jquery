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
    console.log(event.target.value);
  }
}
ControlPanel.className = 'control-panel';
ControlPanel.dataId = '[data-id="control-panel"]';

export default ControlPanel;
