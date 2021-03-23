class View {
  constructor(root, options) {
    this.root = root;
    this.components = options.components || [];
  }

  init() {
    this.components = this.components.map((Component) => {
      const component = new Component(this.root, {});
      component.render();
      return component;
    });
  }
}

export default View;
