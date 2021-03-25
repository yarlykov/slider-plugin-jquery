const separators = { element: '__', modifier: '_' };

function isString(string) {
  if (typeof (string) === 'string') {
    return string;
  }
  return '';
}

function bemName(names = {}) {
  const { b = '', e = '', m = '' } = names;
  const haveAll = (isString(b) && isString(e) && isString(m)) !== '';
  const blockAndElement = (isString(b) && isString(e)) !== '';
  const blockAndModifier = (isString(b) && isString(m)) !== '';

  if (haveAll) {
    return `${b}${separators.element}${e}${separators.modifier}${m}`;
  }
  if (blockAndElement) {
    return `${b}${separators.element}${e}`;
  }
  if (blockAndModifier) {
    return `${b}${separators.modifier}${m}`;
  }
  return `${b}`;
}

export default bemName;
