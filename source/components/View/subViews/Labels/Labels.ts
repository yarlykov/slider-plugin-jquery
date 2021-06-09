import './labels.scss';
import SliderComponent from '../SliderComponent';

class Labels extends SliderComponent {
  display() {
    const scale = this.root.querySelector('[data-id="scale"]');
    if (!scale) throw new Error('Ooops... scale is not found');

    if (this.state.labels)
      scale.insertAdjacentHTML('beforeend', this.getTemplate());
  }

  getTemplate() {
    const { orientation = 'horizontal', min, max } = this.state;

    return `
      <div class="slider__labels slider__labels_${orientation}" data-id="labels">
        ${this.toLabel(min, max)}
      </div>
    `;
  }

  toLabel(minLabelCount: number = 0, maxLabelCount: number = 100): string {
    const { orientation } = this.state;
    const step = Math.round(maxLabelCount - minLabelCount);
    
    
    const labels = [];

    for (let i = 0; i <= 4; i += 1) {
      const label = document.createElement('div');
      label.className = 'slider__labels-item';
      if (i === 0) {
        label.innerText = `${minLabelCount}`;
        label.style.left = `${0}%`
      }
      if (i === 1) {
        label.innerText = `${((25 * step) / 100 + minLabelCount).toFixed()}`;
        label.style.left = `${25}%`;
      }
      if (i === 2) {
        label.innerText = `${(50 * step) / 100 + minLabelCount}`;
        label.style.left = `${50}%`;
      }
      if (i === 3) {
        label.innerText = `${(75 * step) / 100 + minLabelCount}`;
        label.style.left = `${75}%`;
      }
      if (i === 4) {
        label.innerText = `${maxLabelCount}`;
        label.style.left = `${100}%`;
      }
      labels.push(label.outerHTML);
    }

    if (orientation === 'vertical') return labels.reverse().join('');
    return labels.join('');
  } // REFACTOR THIS!!!!!!!!!!
}

export default Labels;
