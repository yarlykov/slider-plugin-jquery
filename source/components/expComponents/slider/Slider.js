class Slider {
  constructor(selector, options) {
    this.init(selector);
    this.components = options.components || [];
  }

  init(mainHtmlNode) {
    this.$mainHtmlNode = document.querySelector(mainHtmlNode);
  }
}

export default Slider;
