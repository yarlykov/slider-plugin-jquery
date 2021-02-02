import Fill from '../fill/Fill';
import Lever from '../lever/Lever';
import Labels from '../labels/Labels';

class Scale {
  constructor(options = {}) {
    this.options = options;
    this.prepare();
  }

  prepare() {
    this.$lever = new Lever(this.options);
    this.$fill = new Fill(this.options);
    this.$labels = new Labels(this.options);
  }

  toHTML() {
    const { orientation = '' } = this.options;

    return `
      <div class="slider__scale slider__scale_${orientation}" data-scale-component="scale">
        ${this.$fill.toHTML()}
        ${this.$lever.toHTML()}
        ${this.$labels.toHTML()}
      </div>
    `;
  }
}
Scale.className = 'slider__scale';

export default Scale;
