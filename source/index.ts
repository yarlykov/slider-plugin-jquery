import './demo-page/styles/main.scss';
import { View } from './components/View/View';

const slider: HTMLElement | null = document.querySelector('.slider-plugin') || null;

const view = new View(slider, {
  min: 0,
  max: 100,
  step: 25,
  currentValue: 42,
  rangeMin: 21,
  rangeMax: 42,
  orientation: 'horizontal',
  range: false,
  elements: {
    fill: true,
  },
  units: '¥',
  color: 'orange',
});

view.init();
