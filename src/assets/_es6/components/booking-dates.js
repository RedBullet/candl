function makeRadios(){
  /*
    Get dates for the next two weeks
    Put into page
      <label><input type="radio" name="toggle" value="2016-01-05"><span class="btn">Wed 5th Jan</span></label>
  */
  let date = new Date();

  const monthNames = [
    "Jan", "Feb", "Mar",
    "Apr", "May", "Jun", "Jul",
    "Aug", "Sep", "Oct",
    "Nov", "Dec"
  ];

  const dayNames = [
    "Sun","Mon","Tue","Wed","Thu","Fri","Sat"
  ];

  const result = document.querySelector('.radio-group-options');

  date.setHours(0,0,0,0);

  for (let i=1;i<=14;i++) {
    let label = document.createElement('label'),
        day = date.getDay(),
        dayNum = date.getDate(),
        monthNum = date.getMonth(),
        year = date.getFullYear(),
        month = monthNames[monthNum],
        value = (monthNum+1)+'-'+dayNum+'-'+year,
        text = dayNames[day]+' '+dayNum+' '+month;

    if (day != 0 && day != 6) {
      label.innerHTML = '<input type="radio" data-required="Let us know when you\'re coming" class="js-date-selector" required name="entry.1255721510" value="'+value+'"><span class="btn">'+text+'</span>';
      result.appendChild(label);
    }

    date.setDate(date.getDate() + 1);
  }
}

function showHideDate(){
  const dateInput = document.querySelector('.js-make-radios');
  if (document.querySelector('.js-date-input-show').checked) {
    dateInput.setAttribute('style', '');
    dateInput.disabled = false;
  } else {
    dateInput.setAttribute('style', 'display: none;');
    dateInput.disabled = true;
  }
}

function dateSelectorToggle(){
  const dateInput = document.querySelector('.js-make-radios');
  dateInput.setAttribute('style', 'display: none;');
  dateInput.disabled = true;

  const triggers = document.querySelectorAll('.js-date-selector');

  for (let i=0;i<triggers.length;i++) {
    triggers[i].addEventListener('change',showHideDate);
  }
}

export default function(){
  makeRadios();
  dateSelectorToggle();


}