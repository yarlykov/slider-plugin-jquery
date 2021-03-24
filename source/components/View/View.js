class View {
  constructor(root, options) {
    this.root = root;
    this.components = options.components || [];
    this.options = options;
    this.options.display.type = this.options.display.type === 'vertical'
      ? 'vertical'
      : 'horizontal';
    // console.log('View', root);
  }

  init() {
    this.components = this.components.map((Component) => {
      const component = new Component(this.root, this.options);
      component.render();
      return component;
    });
  }
}

export default View;
