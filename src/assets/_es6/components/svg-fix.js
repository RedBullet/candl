function isCrapBrowser() {
  const ua = window.navigator.userAgent;
  if (ua.indexOf('Trident/7.0') > 0) {
    return true;
  } else if (ua.indexOf('Trident/6.0') > 0) {
    return true;
  } else if (ua.indexOf('Trident/5.0') > 0) {
    return true;
  } else if ((nua.indexOf('Mozilla/5.0') > -1 && nua.indexOf('Android ') > -1 &&     nua.indexOf('AppleWebKit') > -1) && !(nua.indexOf('Chrome') > -1)) {
    return true;
  }
  return false;  // not IE9, 10 or 11 or android
}

function fixThisSVG(svg) {
  const width = svg.getAttribute('width');
  const height = svg.getAttribute('height');

  if (width && height && !svg.getAttribute('data-ignore-svg-polyfill') && isCrapBrowser()) {
    const ratio = (parseInt(height, 10) / parseInt(width, 10) * 100) + '%';
    const wrapper = document.createElement('div');
    const spacer = document.createElement('div');

    spacer.setAttribute('style', 'display: block; padding-bottom: ' + ratio);
    wrapper.setAttribute('style', 'position: relative;height: 100%');

    wrapper.appendChild(spacer);

    svg.parentNode.appendChild(wrapper);

    svg.setAttribute('style', 'display: block; width: 100%; position: absolute; top: 0; left: 0; bottom: 0;');

    wrapper.appendChild(svg);
  }
}

function fixSizes() {
  [...document.querySelectorAll('svg')].forEach(fixThisSVG);
}

export default function init() {
  fixSizes();
}
