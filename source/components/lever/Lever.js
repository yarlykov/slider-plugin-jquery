import SliderComponent from '../../core/SliderComponent';

class Lever extends SliderComponent {
  constructor($root, options) {
    super($root, {
      name: 'Lever',
      listeners: [],
      ...options,
    });
  }
}
Lever.dataId = '[data-id="lever"]';

export default Lever;
