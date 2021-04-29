function createElement(tag: string, className?: string[]): HTMLElement {
  const element = document.createElement(tag);

  if (className) element.classList.add(...className);

  return element;
}

export { createElement };
