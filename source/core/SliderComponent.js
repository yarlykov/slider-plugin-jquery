import DomListener from './DomListener';

class SliderComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || '';
    this.emitter = options.emitter;
    this.unsubscriptions = [];
    this.store = options.store;
    this.storeSub = null;
    this.state = this.getSliderStateFromStorage();

    this.prepare();
  }

  prepare() {
  }

  getSliderStateFromStorage() {
    const storageState = this.store.getState();

    return {
      value: storageState.sliderPositionState.value || 0,
      id: 'currentPosition',
    };
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

  $dispatch(action) {
    this.store.dispatch(action);
  }

  $subscribe(fn) {
    this.storeSub = this.store.subscribe(fn);
  }

  destroy() {
    this.removeDOMListeners();
    this.unsubscriptions.forEach((unsubscribe) => unsubscribe());
    this.storeSub.unsubscribe();
  }
}

export default SliderComponent;
