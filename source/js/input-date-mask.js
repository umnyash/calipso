import { getDigitsFromString } from './util.js';

function setInputDateMask(inputElement) {
  const DAY_NUMBER_MAX_FIRST_DIGIT = 3;
  const DAY_NUMBER_LENGTH = 2;
  const DAY_MIN_NUMBER = 1;
  const DAY_MAX_NUMBER = 31;

  const MONTH_NUMBER_MAX_FIRST_DIGIT = 1;
  const MONTH_NUMBER_LENGTH = 2;
  const MONTH_MIN_NUMBER = 1;
  const MONTH_MAX_NUMBER = 12;

  function formatInputValue(value) {
    const digits = getDigitsFromString(value); // Цифры из введённой строки.
    let formattedValue = '';

    if (digits.length) {
      const dayNumberFirstDigit = +digits[0];

      if (dayNumberFirstDigit <= DAY_NUMBER_MAX_FIRST_DIGIT) {
        // В этой ветке первые две цифры являются номером дня.
        formattedValue = dayNumberFirstDigit;

        if (digits.length > 1) {
          const dayNumber = +digits.substring(0, 2);

          if (dayNumber === 0) {
            formattedValue = `0${DAY_MIN_NUMBER}`;
          } else {
            formattedValue = (dayNumber <= DAY_MAX_NUMBER) ? dayNumber.toString().padStart(DAY_NUMBER_LENGTH, '0') : DAY_MAX_NUMBER;
          }
        }

        // Поскольку в этой ветке первые две цифры явлются номером дня, третья станет первой цифрой номера месяца.

        if (digits.length > 2) {
          const monthNumberFirstDigit = +digits[2];

          if (monthNumberFirstDigit <= MONTH_NUMBER_MAX_FIRST_DIGIT) {
            // В этой ветке третья и четвёртая цифры являются номером месяца.
            formattedValue = `${formattedValue}.${monthNumberFirstDigit}`;

            // Проверяем 4-число, вместе с третьим
            if (digits.length > 3) {
              const dayNumber = digits.substring(0, 2);
              const monthNumber = +digits.substring(2, 4);

              if (monthNumber === 0) {
                formattedValue = `${dayNumber}.0${MONTH_MIN_NUMBER}`;
              } else {
                formattedValue = `${dayNumber}.${(monthNumber <= MONTH_MAX_NUMBER) ? monthNumber.toString().padStart(MONTH_NUMBER_LENGTH, '0') : MONTH_MAX_NUMBER}`;
              }
            }

            // Поскольку в этой ветке третья и четвёртая цифры являются номером месяца, пятая цифра станет первой цифрой номера года.
            if (digits.length > 4) {
              const yearNumber = digits.substring(4, 8);
              formattedValue += `.${yearNumber}`;
            }
          } else {
            // В этой ветке номером месяца является только третья цифра.
            const dayNumber = digits.substring(0, 2);
            formattedValue = `${dayNumber}.0${monthNumberFirstDigit}`;

            // Поскольку в этой ветке номером месяца является только третья цифра, четвёртая станет первой цифрой номера года.
            if (digits.length > 3) {
              const yearNumber = digits.substring(3, 7);
              formattedValue += `.${yearNumber}`;
            }
          }
        }
      } else {
        // В этой ветке номером дня является только первая цифра.
        formattedValue = `0${dayNumberFirstDigit}`;

        // Поскольку в этой ветке номером дня является только первая цифра, вторая станет первой цифрой номера месяца.

        if (digits.length > 1) {
          const monthNumberFirstDigit = +digits[1];

          if (monthNumberFirstDigit <= MONTH_NUMBER_MAX_FIRST_DIGIT) {
            formattedValue = `${formattedValue}.${monthNumberFirstDigit}`;

            if (digits.length > 2) {
              // В этой ветке вторая и третья цифры являются номером месяца.
              const dayNumber = digits.substring(0, 1).padStart(DAY_NUMBER_LENGTH, '0');
              const monthNumber = +digits.substring(1, 3);

              if (monthNumber === 0) {
                formattedValue = `${dayNumber}.0${MONTH_MIN_NUMBER}`;
              } else {
                formattedValue = `${dayNumber}.${(monthNumber <= MONTH_MAX_NUMBER) ? monthNumber.toString().padStart(MONTH_NUMBER_LENGTH, '0') : MONTH_MAX_NUMBER}`;
              }
            }

            // Поскольку в этой ветке вторая и третья цифры являются номером месяца, четвёртая цифра станет первой цифрой номера года.
            if (digits.length > 3) {
              const yearNumber = digits.substring(3, 7);
              formattedValue += `.${yearNumber}`;
            }
          } else {
            // В этой ветке номером месяца является только вторая цифра.
            formattedValue = `${formattedValue}.0${monthNumberFirstDigit}`;

            // Поскольку в этой ветке номером месяца является только вторая цифра, третья станет первой цифрой номера года.
            if (digits.length > 2) {
              const yearNumber = digits.substring(2, 6);
              formattedValue += `.${yearNumber}`;
            }
          }
        }
      }
    }

    return formattedValue;
  }

  inputElement.addEventListener('input', (evt) => {

    if (inputElement.value.length !== inputElement.selectionStart) {
      if (evt.data && /\D/g.test(evt.data)) {
        inputElement.value = formatInputValue(inputElement.value);
      }

      return;
    }

    inputElement.value = formatInputValue(inputElement.value);
  });

  inputElement.addEventListener('change', () => {
    inputElement.value = formatInputValue(inputElement.value);
  });
}

export { setInputDateMask };
