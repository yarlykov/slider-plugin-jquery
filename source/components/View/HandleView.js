import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from "constants";
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

    this.tooltipSymbols = {
      ruble: '₽',
      dollar: '$',
      yen: '¥',
    }
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

    this.horizontalShift = event.clientX - this.$handle.getBoundingClientRect().left;

    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);

    this.$handle.addEventListener('dragstart', this.disableDragStart)
  }

  onMouseMove(event) {
    let newLeftPosition = event.clientX - (this.horizontalShift / 2) - this.$slider.getBoundingClientRect().left;

    if (newLeftPosition < 0) {
      newLeftPosition = 0;
    }

    let rightEdgePosition = this.$slider.offsetWidth;

    if (newLeftPosition > rightEdgePosition) {
      newLeftPosition = rightEdgePosition;
    }

    let inPercentages = this.conversionToPercent(newLeftPosition, rightEdgePosition)
    this.$handle.style.left = inPercentages + '%';

    this.tooltip(inPercentages, this.tooltipSymbols.yen)
    this.fill('width', inPercentages)
  }

  conversionToPercent(currentValue, totalValue) {
    return currentValue * 100 / totalValue;
  }

  onMouseUp() {
    document.removeEventListener('mouseup', this.onMouseUp);
    document.removeEventListener('mousemove', this.onMouseMove);
  } 

  position(position='left', percent) {
    if (percent < 0) {
      percent = 0;
    }

    this.$handle.style = `${position}: ${percent}%`;

    this.tooltip(percent);
    this.fill('width', percent)
  }

  tooltip(currentValueInPercent, symbol='val') {
    this.$tooltip = this.el.querySelector('.tooltip__value')
    let intValue = Math.floor(currentValueInPercent)

    this.$tooltip.textContent = `${intValue} ${symbol}`;
  }

  fill(prop, currentValueInPercent){
    this.$fill = this.el.querySelector('#fill')
    let floatValue = currentValueInPercent.toFixed(2);

    this.$fill.style = `width: ${floatValue}%`;
  }
}

const mainNode = document.querySelector('#slider')

const slider = new Handle(mainNode)
window.test = slider