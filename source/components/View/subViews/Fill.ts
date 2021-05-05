import { IOptions } from "../../interfaces";

class Fill {
  display(options: IOptions, root: HTMLElement): void {
    const { orientation = 'horizontal', color = 'orange', fill = false} = options;
    const scale = root.querySelector('[data-id="scale"]');

    const fillTemplate = `
      <div class="slider__fill slider__fill_${orientation} slider__fill_${color}" 
      data-id="fill" data-scale-component="fill">
      </div>
    `;

    if (scale === null) throw new Error('Scale element is not found');
    if (fill) scale.insertAdjacentHTML('afterbegin', fillTemplate);
  }
}

export default Fill;
