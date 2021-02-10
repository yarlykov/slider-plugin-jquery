import $ from '../../core/dom';
import { checkOnExtremeValues } from '../../core/utils';

function clickedOnSliderScale(mouseEvent) {
  const $scale = mouseEvent.target.dataset.scaleComponent === 'scale' ? $(mouseEvent.target) : $(mouseEvent.target.parentNode);
  const scaleCoords = $scale.getCoords();
  const $tooltipValue = $($scale.find('[data-lever-component="tooltip-value"]'));
  const $fill = $($scale.find('[data-scale-component="fill"]'));
  const $lever = $($scale.find('[data-lever-component="lever"]'));
  const delta = mouseEvent.pageX - scaleCoords.left;
  const positionInPercent = (delta * 100) / scaleCoords.width;
  const currentPosition = checkOnExtremeValues(positionInPercent);

  $lever.css({ left: `${currentPosition}%` });
  $tooltipValue.text(`${Math.ceil(currentPosition.toString())} ¥`);
  $fill.css({ width: `${currentPosition}%` });

  // document.onmouseup = () => {
  //   document.onmousemove = null;
  //   document.onmouseup = null;
  // };

  // document.onmousemove = (moveEvent) => {
  //   const orientation = mouseEvent.target.closest('[data-slider="horizontal"]')
  //     ? 'horizontal'
  //     : 'vertical';
  //   if (orientation === 'horizontal') {
  //     const delta = moveEvent.pageX - scaleCoords.left;
  //     const positionInPercent = (delta * 100) / scaleCoords.width;
  //     const currentPosition = checkOnExtremeValues(positionInPercent);

  //     $lever.css({ left: `${currentPosition}%` });
  //     $tooltipValue.text(`${Math.ceil(currentPosition.toString())} ¥`);
  //     $fill.css({ width: `${currentPosition}%` });
  //   } else if (orientation === 'vertical') {
  //     const delta = scaleCoords.bottom - moveEvent.pageY;
  //     const positionInPercent = (delta * 100) / scaleCoords.height;
  //     const currentPosition = checkOnExtremeValues(positionInPercent);

  //     $lever.css({ bottom: `${currentPosition}%` });
  //     $tooltipValue.text(`${Math.ceil(currentPosition.toString())} ¥`);
  //     $fill.css({ height: `${currentPosition}%` });
  //   }

  //   document.onmouseup = () => {
  //     document.onmousemove = null;
  //     document.onmouseup = null;
  //   };
  // };
}

export default clickedOnSliderScale;
