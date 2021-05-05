import { IOptions } from '../../interfaces';

class Knobs {
  display(options: IOptions, root: HTMLElement) {
    const { orientation = 'horizontal', color = 'orange' } = options;
    const scale = root.querySelector('[data-id="scale"]');

    if (!scale) throw new Error('Ooops... scale is not found');

    const knobTemplate = `
      <div class="slider__knob slider__knob_${orientation} slider__knob_${color}" data-id="knob">
      </div>
    `;

    scale.insertAdjacentHTML('beforeend', knobTemplate);
  }
}

export default Knobs;
