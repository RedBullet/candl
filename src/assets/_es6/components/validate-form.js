import validator from 'validator';
import jsonp from 'jsonp';
import serialize from 'form-serialize';

function closest(el, selector) {
    let matchesFn;
    let parent;
    // find vendor prefix
    ['matches','webkitMatchesSelector','mozMatchesSelector','msMatchesSelector','oMatchesSelector'].some(function(fn) {
        if (typeof document.body[fn] == 'function') {
            matchesFn = fn;
            return true;
        }
        return false;
    })

    // traverse parents
    while (el!==null) {
      parent = el.parentElement;
      if (parent!==null && parent[matchesFn](selector)) {
          return parent;
      }
      el = parent;
    }
    return null;
}

function showError(el, error = 'required'){
  let msg = el.getAttribute("data-"+error) || 'There\'s something wrong with this field';
  const col = closest(el,'.form-col');

  if (col.querySelector('.validation-hint')) {
    col.querySelector('.validation-hint').innerHTML = msg;
  } else {
    const err = document.createElement('span');
    err.classList.add('validation-hint');
    err.innerHTML = msg;
    col.appendChild(err);
  }

  col.querySelector('.form-col > label').classList.add('is-invalid');

}

function hideError(el){
  const col = closest(el,'.form-col'),
        remove = col.querySelector('.validation-hint');

  col.querySelector('.form-col > label').classList.remove('is-invalid');
  if (remove) {
    col.removeChild(remove);
  }
}

function radioGroupIsValid(group){
  let valid = false;
  const radios = [...document.querySelectorAll('[type="radio"]'+group)];

  radios.forEach(function(radio){
    if (radio.checked) {
      valid = true;
    }
  });

  return valid;
}

function formIsValid(form){
  let valid = true;

  // Required radios
  // Grrr bloody radio validation, should generalise this but brain has melted
  const radios = [
    '[name="entry.1255721510"]',
    '[name="entry.48980749"]',
    '[name="entry.688952502"]'
  ];

  radios.forEach(function(radioGroup){
    if (!radioGroupIsValid(radioGroup)) {
      valid = false;
      showError(document.querySelector(radioGroup));
    } else {
      hideError(document.querySelector(radioGroup));
    }
  });

  // Required not radios
  [...document.querySelectorAll('[required]:not([disabled]):not([type=radio])')].forEach(function(el){
    if (el.value == '') {
      valid = false;
      showError(el);
    } else {
      hideError(el);
    }
  });

  // Email
  const email = document.querySelector('[type="email"]');
  if (!validator.isEmail(email.value)) {
    valid = false;
    showError(email,'email');
  } else {
    hideError(email);
  }

  // Honeypot
  if (document.querySelector('[name="delicioushoney"]').value != '') {
    valid = false;
  }

  return valid;
}

function bind(){
  const form = document.querySelector('form');

  form.setAttribute('noValidate','noValidate');

  form.addEventListener('submit',function(e){
    e.preventDefault();
    if (!formIsValid()) {
      [...document.querySelectorAll('input,textarea')].forEach(function(el){
        el.addEventListener('change',function(){
          formIsValid(form);
        });
      });
    } else {
      let data = serialize(form);
      const url = form.getAttribute('action'),
            opts = {};

      data = data+'&callback=?';

      form.setAttribute('style','display: none;');
      document.querySelector('.thanks').setAttribute('style','display:block;');
      window.location.hash = 'thanks';
      jsonp(url+'?'+data, opts, function(){});
    }

  });
}

export default function init(){
  bind();
}
