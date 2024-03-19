function initTextFieldWithList(fieldElement) {
  const controlElement = fieldElement.querySelector('.text-field__control');
  const listElement = fieldElement.querySelector('.text-field__data-list');

  function openDataList() {
    listElement.classList.add('text-field__data-list--open');
    document.addEventListener('click', onDataListClick);
  }

  function closeDataList() {
    listElement.classList.remove('text-field__data-list--open');
    document.removeEventListener('click', onDataListClick);
  }

  function onDataListClick({target}) {
    if (!target.closest('.text-field')) {
      closeDataList();
    }
  }

  controlElement.addEventListener('click', () => {
    openDataList();
  });

  listElement.addEventListener('click', ({ target }) => {
    const linkElement = target.closest('.text-field__data-link');

    if (!linkElement) {
      return;
    }

    controlElement.value = linkElement.textContent;
    controlElement.dispatchEvent(new Event('input', {
      bubbles: true,
    }));
    closeDataList();
  });
}

export { initTextFieldWithList };
