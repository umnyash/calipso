function initDateField(fieldElement) {
  const fiedControlElement = fieldElement.querySelector('.text-field__control');

  new AirDatepicker(fieldElement, { // eslint-disable-line
    classes: 'calendar',
    dateFormat: 'yyyy-MM-dd',
    navTitles: {
      classes: 'text-field__calendar',
      days: '<span class="month">MMMM</span> <span class="year">yyyy</span>',
      weekends: [0, 6]
    },
    onSelect({ formattedDate }) {
      fiedControlElement.value = formattedDate;
    },
  });
}

export { initDateField };
