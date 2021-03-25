import './demo-page/styles/main.scss';
import View from './components/View/View';

const slider = document.querySelector('.slider-plugin');

const view = new View(slider, {
  scale: {
    min: 0,
    max: 100,
    step: 25,
  },
  values: {
    current: 42,
    rangeMin: 21,
    rangeMax: 42,
  },
  display: {
    type: 'horizontal',
    range: false,
    labels: true,
    tooltips: true,
    units: '¥',
    color: 'orange',
  },
});

view.init();
