function initDateFieldCalendar(element) {
  new AirDatepicker(element, { // eslint-disable-line
    navTitles: {
      classes: 'text-field__calendar',
      days: '<strong class="fff">yyyy</strong> <i>MMMM</i>',
      weekends: [0, 6]
    }
  });
}

export { initDateFieldCalendar };
