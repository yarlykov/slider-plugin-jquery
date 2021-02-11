import $ from '../../core/dom';
import Emitter from '../../core/Emitter';

class Container {
  constructor(mainHtmlNode, options) {
    this.init(mainHtmlNode);
    this.components = options.components || [];
    this.emitter = new Emitter();
  }

  init(mainHtmlNode) {
    this.$mainHtmlNode = $(mainHtmlNode);
  }

  getRoot() {
    const componentOptions = {
      emitter: this.emitter,
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
}

export default Container;
