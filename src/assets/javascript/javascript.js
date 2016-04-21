'use strict';

// @TODO Browserify

var inlineLinks = document.querySelectorAll('[href^="#"]');

function scrollToThis(e) {
  e.preventDefault();
  var target = document.getElementById(this.getAttribute('href').replace('#', '')),
      top = target.getBoundingClientRect().top,
      isSmoothScrollSupported = 'scrollBehavior' in document.documentElement.style;

  // Works in FF, might get enabled in Chrome soon (GM Jan 2016 https://www.chromestatus.com/features/5812155903377408)
  if (isSmoothScrollSupported) {
    window.scrollTo({
      'behavior': 'smooth',
      'left': 0,
      'top': top
    });
  } else {
    window.scrollTo(0, top);
  }
}

for (var i = 0; i < inlineLinks.length; i++) {
  inlineLinks[i].addEventListener('click', scrollToThis);
}
