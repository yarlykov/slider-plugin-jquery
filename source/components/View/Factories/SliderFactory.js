import SimpleSlider from './SimpleSlider';

class SliderFactory {
  create(options, type = 'simple') {
    const Slider = SliderFactory.list[type] || SliderFactory.list.simple;
    const slider = new Slider(options);

    return slider;
  }
}

SliderFactory.list = {
  simple: SimpleSlider,
};

export default SliderFactory;
