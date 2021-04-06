import SimpleSlider from './SimpleSlider';

class SliderFactory {
  create(options, root) {
    const { type } = options;
    const Slider = SliderFactory.list[type] || SliderFactory.list.simple;
    const slider = new Slider(options, root);

    return slider;
  }
}

SliderFactory.list = {
  simple: SimpleSlider,
};

export default SliderFactory;
