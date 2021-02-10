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

import './demo-page/styles/main.scss';

// const wrapper = document.querySelectorAll('.demo-page__block');

// wrapper.forEach((node) => {
//   console.log(node);
//   const container = new Container(node, {
//     components: [ControlPanel, Slider, Fill, Labels, Lever, Scale, Tooltip],
//   });
//   container.render();
// });

const container = new Container('.demo-page__block', {
  components: [ControlPanel, Slider, Fill, Labels, Lever, Scale, Tooltip],
});
container.getRoot();
