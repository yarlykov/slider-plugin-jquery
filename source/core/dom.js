class Dom {
  constructor(selector) {
    this.$nativeElement = typeof selector === 'string'
      ? document.querySelector(selector)
      : selector;
  }

  html(html) {
    if (typeof html === 'string') {
      this.$nativeElement.innerHTML = html;
      return this;
    }
    return this.$nativeElement.outerHTML.trim();
  }

  clear() {
    this.html('');
    return this;
  }

  on(eventType, callback) {
    this.$nativeElement.addEventListener(eventType, callback);
  }

  off(eventType, callback) {
    this.$nativeElement.removeEventListener(eventType, callback);
  }

  append(node) {
    let domNode = node;
    if (domNode instanceof Dom) {
      domNode = domNode.$nativeElement;
    }
    if (Element.prototype.append) {
      this.$nativeElement.append(domNode);
    } else {
      this.$nativeElement.appendChild(domNode);
    }
    return this;
  }

  css(styles = {}) {
    Object.keys(styles).forEach((key) => { this.$nativeElement.style[key] = styles[key]; });
  }

  text(textContent) {
    this.$nativeElement.textContent = textContent;
  }

  closest(selector) {
    return this.$nativeElement.closest(selector);
  }

  querySelector(selector) {
    return this.$nativeElement.querySelector(selector);
  }

  prev() {
    return this.$nativeElement.previousElementSibling || null;
  }

  getCoords() {
    return this.$nativeElement.getBoundingClientRect();
  }
}

export default function $(selector) {
  return new Dom(selector);
}

$.create = (tagName, classes = '') => {
  const nativeElement = document.createElement(tagName);
  if (classes) {
    nativeElement.classList.add(classes);
  }
  return $(nativeElement);
};
