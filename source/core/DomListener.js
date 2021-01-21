import capitalize from './utils';

function getMethodName(eventName) {
  return `on${capitalize(eventName)}`;
}

class DomListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error('No $root provided for DomListener!');
    }
    this.$root = $root;
    this.listeners = listeners;
  }

  initDOMListeners() {
    this.listeners.forEach((listener) => {
      const method = getMethodName(listener);
      if (!this[method]) {
        throw new Error(
          `Method ${method} is not implemented in ${this.name} Component`,
        );
      }

      this.$root.on(listener, this[method].bind(this));
    });
  }

  removeDOMListeners() {

  }
}

export default DomListener;
