// import './components/View/LeverView';
// import './components/View/ControlPanel';

import Slider from './components/expComponents/slider/Slider';
import ControlPanel from './components/expComponents/control-panel/ControlPanel';
import SliderWrapper from './components/expComponents/SliderWrapper/SliderWrapper';
// import Scale from './components/expComponents/scale/Scale';
// import Lever from './components/expComponents/lever/Lever';
// import Tooltip from './components/expComponents/tooltip/Tooltip';
// import Fill from './components/expComponents/fill/Fill';
// import Labels from './components/expComponents/labels/Labels';
import './demo-page/styles/main.scss';

const sliderWrapper = new SliderWrapper('.demo-page__wrapper', {
  components: [ControlPanel, Slider],
});

sliderWrapper.render();
