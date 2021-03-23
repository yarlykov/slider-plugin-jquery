import './demo-page/styles/main.scss';
import Knobs from './components/View/subViews/Knobs';
import Labels from './components/View/subViews/Labels';
import Scale from './components/View/subViews/Scale';
import View from './components/View/View';
import Wrapper from './components/View/subViews/Wrapper';

const slider = document.querySelector('.slider-plugin');
const view = new View(slider, {
  components: [Wrapper, Scale, Knobs, Labels],
});

view.init();
