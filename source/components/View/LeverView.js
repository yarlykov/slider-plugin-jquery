// import ControlPanel from './ControlPanel';

class Lever {
  constructor(node) {
    this.$el = node;

    this._init();
    this._setup();
  }

  _init() {
    this.$lever = this.$el.querySelector('.slider__lever');
    this.$slider = this.$el.querySelector('.slider__scale');
    this.$tooltip = this.$el.querySelector('.tooltip__value');
    this.$fill = this.$el.querySelector('.slider__fill');

    this.leverCoords = {
      min: 0,
      max: 100,
      inPercent: 0,
    };

    this.tooltipSymbols = {
      ruble: '₽',
      dollar: '$',
      yen: '¥',
    };
  }

  _setup() {
    this.bindEventListeners();
    this.$lever.addEventListener('mousedown', this.handleLeverChange);
  }

  bindEventListeners() {
    this.handleLeverChange = this.handleLeverChange.bind(this);
    this.handleLeverMouseMove = this.handleLeverMouseMove.bind(this);
    this.handleLeverMouseUp = this.handleLeverMouseUp.bind(this);
    this._disableDragStart = this._disableDragStart.bind(this);
  }

  handleLeverChange(mouseEvent) {
    mouseEvent.preventDefault();

    const leverProfile = this.$lever.getBoundingClientRect().left;
    this.horizontalShift = mouseEvent.clientX - leverProfile;

    document.addEventListener('mousemove', this.handleLeverMouseMove);
    document.addEventListener('mouseup', this.handleLeverMouseUp);
    this.$lever.addEventListener('dragstart', this._disableDragStart);
  }

  handleLeverMouseMove(moveEvent) {
    this._currentPosition(moveEvent);
    this._maxPosition();

    this.leverCoords.inPercent = this._transformToPercent();
    this.leverChange(this.leverCoords.inPercent);
    // ControlPanel.record(this.leverCoords.inPercent);
  }

  leverChange(valueInPercent) {
    const currentValueInPercent = this._checkOnExtremeValues(valueInPercent);

    this.$lever.style.left = `${currentValueInPercent}%`;
    this.tooltipChange(currentValueInPercent, this.tooltipSymbols.yen);
    this.fillChange('width', currentValueInPercent);
  }

  tooltipChange(currentValueInPercent, tooltipSymbol = 'val') {
    const intValue = Math.floor(currentValueInPercent);

    this.$tooltip.textContent = `${intValue} ${tooltipSymbol}`;
  }

  fillChange(prop, currentValueInPercent) {
    const floatValue = currentValueInPercent.toFixed(2);

    this.$fill.style = `width: ${floatValue}%`;
  }

  handleLeverMouseUp(upEvent) {
    upEvent.preventDefault();

    document.removeEventListener('mouseup', this.handleLeverMouseUp);
    document.removeEventListener('mousemove', this.handleLeverMouseMove);
  }

  _currentPosition(moveEvent) {
    let position = moveEvent.clientX
      - (this.horizontalShift / 2)
      - this.$slider.getBoundingClientRect().left;

    if (position < 0) {
      position = 0;
    }

    this.leverCoords.current = position;
  }

  _maxPosition() {
    this.leverCoords.max = this.$slider.offsetWidth;

    if (this.leverCoords.current > this.leverCoords.max) {
      this.leverCoords.current = this.leverCoords.max;
    }
  }

  _transformToPercent() {
    return (this.leverCoords.current * 100) / this.leverCoords.max;
  }

  _checkOnExtremeValues(currentLeverValue) {
    let newValue = 0;

    if (currentLeverValue < this.leverCoords.min) {
      newValue = this.leverCoords.min;
    } else if (currentLeverValue > this.leverCoords.max) {
      newValue = this.leverCoords.max;
    } else {
      newValue = currentLeverValue;
    }
    return newValue;
  }

  _disableDragStart() {
    return false;
  }
}

const mainNode = document.querySelector('#slider');

const slider = new Lever(mainNode);
window.slider = slider;
