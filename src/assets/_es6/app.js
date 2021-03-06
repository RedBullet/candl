import 'babel-polyfill';
import WebFont from 'webfontloader';
import bookingDates from './components/booking-dates';
import validateForm from './components/validate-form';
import flickity from 'flickity-imagesloaded';
import Pikaday from 'pikaday';

WebFont.load({
  google: {
    families: ['Roboto:300,400,700,300:latin', 'Amatic+SC:400,700:latin']
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

bookingDates();
validateForm();
