import SliderComponent from '../../../core/SliderComponent';

class ControlPanel extends SliderComponent {
  toHTML() {
    return `
      <div class="control-panel__block-control">
        <div class="control-panel__row">
          <label class="control-panel__control">
            <input type="number" class="control-panel__input" value="0">
            <span class="control-panel__title">scale min</span>
          </label>
        </div>
        <div class="control-panel__row">
          <label class="control-panel__control">
            <input type="number" class="control-panel__input" value="100">
            <span class="control-panel__title">scale max</span>
          </label>
        </div>
        <div class="control-panel__row">
          <label class="control-panel__control">
            <input type="number" class="control-panel__input" value="53">
            <span class="control-panel__title">value</span>
          </label>
        </div>
        <div class="control-panel__row">
          <label class="control-panel__control">
            <input type="number" class="control-panel__input" value="1">
            <span class="control-panel__title">step</span>
          </label>
        </div>
        <div class="control-panel__row">
          <label class="control-panel__control">
            <input type="number" class="control-panel__input" value="" disabled>
            <span class="control-panel__title">range min</span>
          </label>
        </div>
        <div class="control-panel__row">
          <label class="control-panel__control">
            <input type="number" class="control-panel__input" value="" disabled>
            <span class="control-panel__title">range max</span>
          </label>
        </div>
      </div>

      <div class="control-panel__block-view">
        <div class="control-panel__row">
         <label class="control-panel__control">
           <select name="" id="" class="control-panel__select">
             <option value="">horisontal</option>
             <option value="">vertical</option>
           </select>
           <span class="control-panel__title">type</span>
         </label>
        </div>

        <div class="control-panel__row">
         <label class="control-panel__control">
           <input type="checkbox" class="control-panel__checkbox"></input>
           <span class="control-panel__title">range</span>
         </label>
        </div>
        <div class="control-panel__row">
         <label class="control-panel__control">
           <input type="checkbox" class="control-panel__checkbox" checked></input>
           <span class="control-panel__title">labels</span>
         </label>
         <label class="control-panel__control">
           <input type="checkbox" class="control-panel__checkbox" checked></input>
           <span class="control-panel__title">tooltips</span>
         </label>
        </div>
        <div class="control-panel__row">
          <label class="control-panel__control">
            <input type="text" class="control-panel__input control-panel__input_text" value="¥">
            <span class="control-panel__title">units</span>
          </label>
        </div>
      </div>
    `;
  }
}
ControlPanel.className = 'control-panel';

export default ControlPanel;
