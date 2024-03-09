import { isSpaceEvent } from './util.js';

function initDateField(fieldElement) {
  const fieldControlElement = fieldElement.querySelector('.text-field__control');
  const toggleButtonElement = fieldElement.querySelector('.text-field__calendar-button');
  let calendarElement = null;

  const calendar = new AirDatepicker(fieldElement, { // eslint-disable-line
    classes: 'calendar text-field__calendar',
    dateFormat: 'yyyy-MM-dd',
    navTitles: {
      classes: 'text-field__calendar',
      days: 'MMMM <span class="calendar__title-accent">yyyy</span>',
      weekends: [0, 6]
    },
    onSelect({ formattedDate }) {
      fieldControlElement.value = formattedDate || '';
      closeCalendar();
    },
  });

  calendarElement = fieldElement.querySelector('.text-field__calendar');

  function setCalendarDate(value) {
    if (!value) {
      return;
    }

    calendar.selectDate(value, {
      updateTime: false,
      silent: true,
    });
  }

  function openCalendar() {
    setCalendarDate(fieldControlElement.value);
    calendar.setViewDate(fieldControlElement.value || Date.now());
    calendar.setCurrentView('days');
    calendarElement.classList.add('text-field__calendar--open');
    document.addEventListener('click', onDocumentClickWhenCalendarOpened);
    toggleButtonElement.classList.add('text-field__calendar-button--active');
  }

  function closeCalendar() {
    calendarElement.classList.remove('text-field__calendar--open');
    document.removeEventListener('click', onDocumentClickWhenCalendarOpened);
    toggleButtonElement.classList.remove('text-field__calendar-button--active');
  }

  function toggleCalendar() {
    if (calendarElement.classList.contains('text-field__calendar--open')) {
      closeCalendar();
    } else {
      openCalendar();
    }
  }

  function onDocumentClickWhenCalendarOpened({ target }) {
    if (!target.closest('.text-field--date')) {
      closeCalendar();
    }
  }

  fieldControlElement.addEventListener('change', () => {
    if (!fieldControlElement.value) {
      return;
    }

    setCalendarDate(fieldControlElement.value);

    if (!calendarElement.classList.contains('text-field__calendar--open')) {
      return;
    }

    calendar.setViewDate(fieldControlElement.value);
    calendar.setCurrentView('days');
  });

  toggleButtonElement.addEventListener('click', () => {
    toggleCalendar();
  });

  fieldControlElement.addEventListener('keydown', (evt) => {
    if (isSpaceEvent(evt)) {
      evt.preventDefault();
      toggleCalendar();
    }
  });
}

export { initDateField };
