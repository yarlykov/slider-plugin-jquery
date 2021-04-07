class Wrapper {
  create(options, root) {
    const { orientation } = options;

    const sliderWrapper = document.createElement('div');
    sliderWrapper.classList.add('slider', `slider_${orientation}`);
    sliderWrapper.setAttribute('data-id', 'slider');
    root.insertAdjacentHTML('afterbegin', sliderWrapper.outerHTML);
  }
}

export default Wrapper;
