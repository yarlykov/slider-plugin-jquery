import SliderComponent from '../../../core/SliderComponent';

class ControlPanel extends SliderComponent {
  constructor($root, options) {
    super($root, {
      name: 'ControlPanel',
      listeners: ['input'],
      ...options,
    });
  }

  toHTML() {
    return `
      <div class="control-panel__block-control">
        <div class="control-panel__row">
          <label class="control-panel__control">
            <input class="control-panel__input" type="number" value="0" data-title="scale-min"><span class="control-panel__title">scale-min</span>
          </label>
        </div>
        <div class="control-panel__row">
          <label class="control-panel__control">
            <input class="control-panel__input" type="number" value="100" data-title="scale-max"><span class="control-panel__title">scale-max</span>
          </label>
        </div>
        <div class="control-panel__row">
          <label class="control-panel__control">
            <input class="control-panel__input" type="number" value="53" data-title="current"><span class="control-panel__title">current</span>
          </label>
        </div>
        <div class="control-panel__row">
          <label class="control-panel__control">
            <input class="control-panel__input" type="number" value="25" data-title="step"><span class="control-panel__title">step</span>
          </label>
        </div>
        <div class="control-panel__row">
          <label class="control-panel__control">
            <input class="control-panel__input" type="number" value="0" data-title="range-min" disabled><span class="control-panel__title">range-min</span>
          </label>
        </div>
        <div class="control-panel__row">
          <label class="control-panel__control">
            <input class="control-panel__input" type="number" value="0" data-title="range-max" disabled><span class="control-panel__title">range-max</span>
          </label>
        </div>
      </div>
      <div class="control-panel__block-view">
        <div class="control-panel__row">
          <label class="control-panel__control">
            <select class="control-panel__select" name="" id="">
              <option value="">horizontal</option>
              <option value="">vertical</option>
            </select><span class="control-panel__title">type</span>
          </label>
        </div>
        <div class="control-panel__row">
          <label class="control-panel__control">
            <input class="control-panel__checkbox" type="checkbox" data-title="range"><span class="control-panel__title">range</span>
          </label>
        </div>
        <div class="control-panel__row">
          <label class="control-panel__control">
            <input class="control-panel__checkbox" type="checkbox" data-title="labels" checked><span class="control-panel__title">labels</span>
          </label>
        </div>
        <div class="control-panel__row">
          <label class="control-panel__control">
            <input class="control-panel__checkbox" type="checkbox" data-title="tooltips" checked><span class="control-panel__title">tooltips</span>
          </label>
        </div>
        <div class="control-panel__row">
          <label class="control-panel__control">
            <input class="control-panel__input control-panel__input_text" type="text" data-title="units" value="¥"><span class="control-panel__title">units</span>
          </label>
        </div>
      </div>
    `;
  }

  onInput(event) {
  }
}
ControlPanel.className = 'control-panel';

export default ControlPanel;
