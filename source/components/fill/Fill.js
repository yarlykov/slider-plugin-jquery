import SliderComponent from '../../core/SliderComponent';

class Fill extends SliderComponent {
  constructor($root, options) {
    super($root, {
      name: 'Fill',
      listeners: [],
      ...options,
    });
  }
}
Fill.dataId = '[data-id="fill"]';

export default Fill;
