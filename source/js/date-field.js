function initDateField(fieldElement) {
  const fiedControlElement = fieldElement.querySelector('.text-field__control');

  new AirDatepicker(fieldElement, { // eslint-disable-line
    classes: 'calendar',
    dateFormat: 'yyyy-MM-dd',
    navTitles: {
      classes: 'text-field__calendar',
      days: '<strong class="fff">yyyy</strong> <i>MMMM</i>',
      weekends: [0, 6]
    },
    onSelect({ formattedDate }) {
      fiedControlElement.value = formattedDate;
    },
  });
}

export { initDateField };
