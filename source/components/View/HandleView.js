import { inherits } from "util";

class Handle {
  constructor(node) {
    this.el = node;
    this.init();
  }

  init() {
    this.position('left', 40)
  }

  position(position='left', percent) {
    this.$handle = this.el.querySelector('#handle')

    this.$handle.style = `${position}: ${percent}%`;
    this.tooltip(percent);
    this.fill('width', percent)
  }

  tooltip(value) {
    this.$tooltip = this.el.querySelector('.tooltip__value')
    this.$tooltip.textContent = `${value}¥`;
  }

  fill(prop, value){
    this.$fill = this.el.querySelector('#fill')
    this.$fill.style = `width: ${value}%`;
  }
}

const mainNode = document.querySelector('#slider')

const slider = new Handle(mainNode)
window.test = slider