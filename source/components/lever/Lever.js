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
Lever.id = '[data-id="lever"]';

export default Lever;
