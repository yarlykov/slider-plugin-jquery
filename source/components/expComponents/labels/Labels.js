class Labels {
  constructor(options = {}) {
    this.options = options;
  }

  createLabel(label = '0') {
    return `<div class="slider__labels-item" data-label="${label}">${label}</div>`;
  }

  render() {
    const { labels = [], orientation = '' } = this.options;
    const items = orientation === 'vertical' ? labels.reverse() : labels;
    const item = [];

    for (let i = 0; i < items.length; i += 1) {
      item.push(this.createLabel(items[i]));
    }

    return item.join(' ');
  }

  toHTML() {
    const { orientation = '' } = this.options;

    return `
      <div class="slider__labels slider__labels_${orientation}" data-component="labels">
        ${this.render()}
      </div>
    `;
  }
}
Labels.className = 'slider__labels';

export default Labels;
