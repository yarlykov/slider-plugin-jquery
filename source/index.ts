import './demo-page/styles/main.scss';
import View from './components/View/View';
import Model from './components/Model/Model';
import Presenter from './components/Presenter/Presenter';
import defaultState from './initialState';

const slider = document.querySelector('#slider-plugin') as HTMLElement;
if (!slider) throw new Error('#slider-plugin is not defined');

declare let window: any;
window.slider = new Presenter(new Model(), new View(slider));