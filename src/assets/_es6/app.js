import 'babel-polyfill';
import scrollTo from './components/scrollTo';
import WebFont from 'webfontloader';
import bookingDates from './components/booking-dates';
import validateForm from './components/validate-form';
import gallery from './components/gallery';
import flickity from 'flickity';
import svgFix from './components/svg-fix';
import Pikaday from 'pikaday';

WebFont.load({
  google: {
    families: ['Roboto+Slab:300,400,700:latin', 'Roboto:300,400,700,300:latin', 'Permanent+Marker::latin', 'Amatic+SC:400,700:latin']
  }
});

function checkDateInput() {
    var input = document.createElement('input');
    input.setAttribute('type','date');

    var notADateValue = 'not-a-date';
    input.setAttribute('value', notADateValue);

    return (input.value !== notADateValue);
}

if (!checkDateInput()) {
  const picker = new Pikaday({ field: document.querySelector('#date') });
}

scrollTo();
bookingDates();
validateForm();
svgFix();
