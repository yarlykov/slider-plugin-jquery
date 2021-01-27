import $ from '../../../core/dom';

class Container {
  constructor(mainHtmlNode, options) {
    this.init(mainHtmlNode);
    this.components = options.components || [];
  }

  init(mainHtmlNode) {
    this.$mainHtmlNode = $(mainHtmlNode);
  }

  getRoot() {
    const $root = $.create('div', 'demo-page__block');

    this.components = this.components.map((Component) => {
      const $el = $.create('div', Component.className);
      const component = new Component($el);
      $el.html(component.toHTML());
      $root.append($el);
      return component;
    });
    return $root;
  }

  render() {
    this.$mainHtmlNode.append(this.getRoot());

    this.components.forEach((component) => component.init());
  }
}

export default Container;
