import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from "constants";
import { inherits } from "util";

class Handle {
  constructor(node) {
    this.$el = node;

    this._init();
    this._setup();
  }

  _init() {
    this.$handle = this.$el.querySelector('.slider__handle')
    this.$slider = this.$el.querySelector('.slider__scale')
    this.$tooltip = this.$el.querySelector('.tooltip__value')
    this.$fill = this.$el.querySelector('.slider__fill')

    this.handlePosition = {
      current: 0,
      max: 0,
      inPercent: 0,
    }
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

  handleListener(mouseEvent) {
    mouseEvent.preventDefault();

    const handleProfile = this.$handle.getBoundingClientRect().left;
    this.horizontalShift = mouseEvent.clientX - handleProfile;

    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
    this.$handle.addEventListener('dragstart', this.disableDragStart)
  }

  onMouseMove(moveEvent) {
    this.currentPosition(moveEvent)
    this.maxPosition()

    this.handlePosition.inPercent = this.conversionToPercent(this.handlePosition.current, this.handlePosition.max);
    this.$handle.style.left = this.handlePosition.inPercent + '%';

    this.tooltip(this.handlePosition.inPercent, this.tooltipSymbols.yen)
    this.fill('width', this.handlePosition.inPercent)
  }

  currentPosition(moveEvent) {
    let position = moveEvent.clientX - (this.horizontalShift / 2) - this.$slider.getBoundingClientRect().left

    if (position < 0) {
      position = 0;
    }

    this.handlePosition.current = position;
  }

  maxPosition() {
    this.handlePosition.max = this.$slider.offsetWidth;

    if (this.handlePosition.current > this.handlePosition.max) {
      this.handlePosition.current = this.handlePosition.max;
    }
  }

  conversionToPercent(currentValue, maxValue) {
    return currentValue * 100 / maxValue;
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
    let intValue = Math.floor(currentValueInPercent)

    this.$tooltip.textContent = `${intValue} ${symbol}`;
  }

  fill(prop, currentValueInPercent){
    let floatValue = currentValueInPercent.toFixed(2);

    this.$fill.style = `width: ${floatValue}%`;
  }

  onMouseUp(upEvent ) {
    upEvent.preventDefault();

    document.removeEventListener('mouseup', this.onMouseUp);
    document.removeEventListener('mousemove', this.onMouseMove);
  } 

  disableDragStart() {
    return false;
  }
}

const mainNode = document.querySelector('#slider')

const slider = new Handle(mainNode)
window.test = slider