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
Labels.dataId = '[data-id="labels"]';

export default Labels;
