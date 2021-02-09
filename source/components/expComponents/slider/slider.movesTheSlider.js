import $ from '../../../core/dom';
import { checkOnExtremeValues } from '../../../core/utils';
import Emitter from '../../../core/Emitter';

const emitter = new Emitter();

function movesTheSlider(mouseEvent) {
  // const unsubscribe = emitter.makeSubscribe('log', (data) => console.log('log', data));
  const orientation = mouseEvent.target.closest('[data-slider="horizontal"]')
    ? 'horizontal'
    : 'vertical';
  const $lever = $(mouseEvent.target);
  const $leverParent = $($lever.closest('[data-scale-component="scale"]'));
  const scaleCoords = $leverParent.getCoords();
  const $tooltipValue = $($lever.find('[data-lever-component="tooltip-value"]'));
  const $fill = $($lever.prev());

  document.onmousemove = (moveEvent) => {
    if (orientation === 'horizontal') {
      const delta = moveEvent.pageX - scaleCoords.left;
      const positionInPercent = (delta * 100) / scaleCoords.width;
      const currentPosition = checkOnExtremeValues(positionInPercent);

      $lever.css({ left: `${currentPosition}%` });
      $tooltipValue.text(`${Math.ceil(currentPosition.toString())} ¥`);
      $fill.css({ width: `${currentPosition}%` });
      emitter.emit('log', currentPosition);
      emitter.emit('inputValue', currentPosition);
    } else if (orientation === 'vertical') {
      const delta = scaleCoords.bottom - moveEvent.pageY;
      const positionInPercent = (delta * 100) / scaleCoords.height;
      const currentPosition = checkOnExtremeValues(positionInPercent);

      $lever.css({ bottom: `${currentPosition}%` });
      $tooltipValue.text(`${Math.ceil(currentPosition.toString())} ¥`);
      $fill.css({ height: `${currentPosition}%` });
    }
  };

  document.onmouseup = () => {
    document.onmousemove = null;
    document.onmouseup = null;
    // unsubscribe();
  };
}

export default movesTheSlider;
