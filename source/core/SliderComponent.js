import DomListener from './DomListener';

class SliderComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || '';
    this.emitter = options.emitter;
    this.subscribe = this.$on;
    this.unsubscriptions = [];

    this.prepare();
  }

  prepare() {
  }

  init() {
    this.initDOMListeners();
  }

  $emit(event, ...args) {
    this.emitter.emit(event, ...args);
  }

  $on(event, fn) {
    const unsubscribe = this.emitter.makeSubscribe(event, fn);
    this.unsubscriptions.push(unsubscribe);
  }

  destroy() {
    this.removeDOMListeners();
    this.unsubscriptions.forEach((unsubscribe) => unsubscribe());
  }
}

export default SliderComponent;
