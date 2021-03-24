function toLabel(minLabelCount = 0, maxLabelCount = 100, step = 1, type = 'horizontal') {
  const stepValue = step === 0 ? 1 : step;
  const labels = [];
  const nextLabelCount = (maxLabelCount * stepValue) / 100;

  if (type === 'horizontal') {
    for (let i = minLabelCount; i <= maxLabelCount; i += nextLabelCount) {
      const label = `<div class="slider__labels-item">${i}</div>`;
      labels.push(label);
    }
  } else {
    for (let i = maxLabelCount; i >= minLabelCount; i -= nextLabelCount) {
      const label = `<div class="slider__labels-item">${i}</div>`;
      labels.push(label);
    }
  }

  return labels.join('');
}

function createLabels(options = {}) {
  const { display, scale } = options;
  return `
      <div class="slider__labels slider__labels_${display.type}" data-id="labels">
        ${toLabel(scale.min, scale.max, scale.step, display.type)}
      </div>
    `;
}

export default createLabels;
