import $ from '../../core/dom';
import Emitter from '../../core/Emitter';

class Container {
  constructor(mainHtmlNode, options) {
    this.init(mainHtmlNode);
    this.components = options.components || [];
    this.emitter = new Emitter();
    this.store = options.store;
  }

  init(mainHtmlNode) {
    this.$mainHtmlNode = $(mainHtmlNode);
  }

  getRoot() {
    const componentOptions = {
      emitter: this.emitter,
      store: this.store,
    };

    this.components = this.components.map((Component) => {
      const $root = $(this.$mainHtmlNode.find(Component.id));
      const component = new Component($root, componentOptions);
      return component;
    });
    this.initAllComponents();
  }

  initAllComponents() {
    this.components.forEach((component) => component.init());
  }

  destroyAllComponents() {
    this.components.forEach((component) => component.destroy());
  }
}

export default Container;
