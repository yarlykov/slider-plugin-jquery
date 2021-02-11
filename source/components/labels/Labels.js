import SliderComponent from '../../core/SliderComponent';

class Labels extends SliderComponent {
  constructor($root, options) {
    super($root, {
      name: 'Labels',
      listeners: [],
      ...options,
    });
  }
}
Labels.id = '[data-id="labels"]';

export default Labels;
