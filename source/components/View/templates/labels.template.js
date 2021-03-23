function toLabel(maxLabelCount = 100) {
  const labels = [];
  const nextLabelCount = (maxLabelCount * 25) / 100;

  for (let i = 0; i <= maxLabelCount; i += nextLabelCount) {
    const label = `<div class="slider__labels-item">${i}</div>`;
    labels.push(label);
  }
  return labels.join('');
}

function createLabels() {
  return `
      <div class="slider__labels slider__labels_horizontal" data-id="labels">
        ${toLabel(100)}
      </div>
    `;
}

export default createLabels;
