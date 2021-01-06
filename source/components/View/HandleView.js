import { inherits } from "util";

class Handle {
  constructor(node) {
    this.el = node;
    this._init();
    this._setup();
  }

  _init() {
    this.$handle = this.el.querySelector('#handle')
    this.$slider = this.el.querySelector('.slider__scale')
  }

  _setup() {
    this.handleListener = this.handleListener.bind(this)
    this.onMouseMove = this.onMouseMove.bind(this)
    this.onMouseUp = this.onMouseUp.bind(this)
    this.disableDragStart = this.disableDragStart.bind(this)

    this.$handle.addEventListener('mousedown', this.handleListener)
  }

  disableDragStart() {
    return false;
  }

  handleListener(event) {
    event.preventDefault();

    this.shiftX = event.clientX - this.$handle.getBoundingClientRect().left;

    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);

    this.$handle.addEventListener('dragstart', this.disableDragStart)
  }

  onMouseMove(event) {
    let newLeftPosition = event.clientX - this.shiftX - this.$slider.getBoundingClientRect().left;

    if (newLeftPosition < 0) {
      newLeftPosition = 0;
    }

    let rightEdgePosition = this.$slider.offsetWidth - this.$handle.offsetWidth;
    if (newLeftPosition > rightEdgePosition) {
      newLeftPosition = rightEdgePosition;
    }

    this.$handle.style.left = newLeftPosition + 'px';
  }

  onMouseUp() {
    document.removeEventListener('mouseup', this.onMouseUp);
    document.removeEventListener('mousemove', this.onMouseMove);
  } 

  position(position='left', percent) {
    this.$handle = this.el.querySelector('.slider__handle')
    this.$slider = this.el.querySelector('.slider__scale')


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