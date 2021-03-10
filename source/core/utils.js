function capitalize(string) {
  if (typeof string !== 'string') {
    return '';
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function checkOnExtremeValues(currentLeverValue) {
  let newValue = 0;

  if (currentLeverValue < 0) {
    newValue = 0;
  } else if (currentLeverValue > 100) {
    newValue = 100;
  } else {
    newValue = currentLeverValue;
  }
  return Math.ceil(newValue);
}

function storage(key, data = null) {
  if (!data) {
    return JSON.parse(localStorage.getItem(key));
  }
  localStorage.setItem(key, JSON.stringify(data));
  return key;
}

export { capitalize, checkOnExtremeValues, storage };
