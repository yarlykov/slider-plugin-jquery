// import './components/View/LeverView';
// import './components/View/ControlPanel';

import Container from './components/Container/Container';
import ControlPanel from './components/control-panel/ControlPanel';
import Slider from './components/slider/Slider';
import Fill from './components/fill/Fill';
import Labels from './components/labels/Labels';
import Lever from './components/lever/Lever';
import Scale from './components/scale/Scale';
import Tooltip from './components/tooltip/Tooltip';

import rootReducer from './redux/rootReducer';
import CreateStore from './core/CreateStore';

import './demo-page/styles/main.scss';
import { storage } from './core/utils';

// const wrapper = document.querySelectorAll('.demo-page__block');

// wrapper.forEach((node) => {
//   console.log(node);
//   const container = new Container(node, {
//     components: [ControlPanel, Slider, Fill, Labels, Lever, Scale, Tooltip],
//   });
//   container.render();
// });
const store = new CreateStore(rootReducer, {
  sliderPositionState: {},
});

store.subscribe((state) => {
  storage('slider-state', state);
});

const container = new Container('.demo-page__block', {
  components: [ControlPanel, Slider, Fill, Labels, Lever, Scale, Tooltip],
  store,
});

container.getRoot();
