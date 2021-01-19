import SliderComponent from '../../../core/SliderComponent';

class ControlPanel extends SliderComponent {
  toHTML() {
    return '<h1>Control Panel</h1>';
  }
}
ControlPanel.className = '.control-panel';

export default ControlPanel;
