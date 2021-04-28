import './demo-page/styles/main.scss';
import { View } from './components/View/View';
import Model from './components/Model/Model';
import Presenter from './components/Presenter/Presenter';
import defaultState from './initialState';

const slider: HTMLElement | null =
  document.querySelector('.slider-plugin') || null;

const view = new View(slider, defaultState);

view.init();

declare let window: any;
window.sliderApp = new Presenter(new Model(), new View(slider, {}));
