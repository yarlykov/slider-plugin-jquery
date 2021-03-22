import createLabel from './labels.template';
import createKnob from './knob.template';

function createScale() {
  return `
      <div class="slider__scale slider__scale_horizontal" data-id="scale" data-scale-component="scale">
        <div class="slider__fill slider__fill_horizontal slider__fill_horizontal_ slider__fill_orange" data-id="fill"
            data-scale-component="fill">
        </div>
        ${createKnob()}
        ${createLabel()}
      </div>

    `;
}

export default createScale;
