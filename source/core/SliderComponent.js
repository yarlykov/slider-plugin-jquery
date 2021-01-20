import DomListener from './DomListener';

class SliderComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
  }

  toHTML() {
    return '';
  }

  init() {
    this.initDOMListeners();
  }
}

export default SliderComponent;
