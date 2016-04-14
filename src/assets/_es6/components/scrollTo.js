
function scrollToThis(e){
  e.preventDefault();
  let target = document.getElementById(this.getAttribute('href').replace('#','')),
      top = target.getBoundingClientRect().top + document.querySelector('body').scrollTop,
      isSmoothScrollSupported = 'scrollBehavior' in document.documentElement.style;

  const doc = document.documentElement;
  const scrollTop = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);

  top = top + scrollTop;

  // Works in FF, might get enabled in Chrome soon (GM Jan 2016 https://www.chromestatus.com/features/5812155903377408)
  if (isSmoothScrollSupported) {
    window.scrollTo({
      'behavior': 'smooth',
      'left': 0,
      'top': top
    });
  } else {
    window.scrollTo(0,top);
  }
}

export default function(selector = '[href^="#"]'){
  const inlineLinks = document.querySelectorAll(selector);

  for (let i=0;i<inlineLinks.length;i++) {
    inlineLinks[i].addEventListener('click',scrollToThis);
  }
}
