import View from './components/View/View';
import './demo-page/styles/main.scss';

const slider = document.querySelector('.slider-plugin');
const view = new View(slider);

view.render();
