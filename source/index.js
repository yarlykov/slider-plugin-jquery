// import './components/View/LeverView';
// import './components/View/ControlPanel';

import Slider from './components/slider/Slider';
import ControlPanel from './components/control-panel/ControlPanel';
import Container from './components/Container/Container';
// import Scale from './components/expComponents/scale/Scale';
// import Lever from './components/expComponents/lever/Lever';
// import Tooltip from './components/expComponents/tooltip/Tooltip';
// import Fill from './components/expComponents/fill/Fill';
// import Labels from './components/expComponents/labels/Labels';
import './demo-page/styles/main.scss';

const container = new Container('.demo-page__wrapper', {
  components: [ControlPanel, Slider],
});

container.render();
