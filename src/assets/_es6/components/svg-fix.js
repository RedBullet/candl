function ie9to11() {
  //return true;
  const ua = window.navigator.userAgent;
  if (ua.indexOf('Trident/7.0') > 0) {
    return true;
  } else if (ua.indexOf('Trident/6.0') > 0) {
    return true;
  } else if (ua.indexOf('Trident/5.0') > 0) {
    return true;
  }
  return false;  // not IE9, 10 or 11
}

function fixThisSVG(svg) {
  const width = svg.getAttribute('width');
  const height = svg.getAttribute('height');

  if (width && height && !svg.getAttribute('data-ignore-svg-polyfill') && ie9to11()) {
    const ratio = (parseInt(height, 10) / parseInt(width, 10) * 100) + '%';
    const wrapper = document.createElement('div');
    const spacer = document.createElement('div');

    spacer.setAttribute('style', 'display: block; padding-bottom: ' + ratio);
    wrapper.setAttribute('style', 'position: relative;');

    wrapper.appendChild(spacer);

    svg.parentNode.appendChild(wrapper);

    svg.setAttribute('style', 'display: block; width: 100%; position: absolute; top: 0; left: 0;');

    wrapper.appendChild(svg);
  }
}

function fixSizes() {
  [...document.querySelectorAll('svg')].forEach(fixThisSVG);
}

export default function init() {
  fixSizes();
}
