function initSelect(selectElement) {
  new Choices(selectElement, { // eslint-disable-line
    searchEnabled: true,
    noResultsText: 'Город не найден',
    searchPlaceholderValue: 'Начните вводить название города',
    itemSelectText: '',
    shouldSort: false,
    maxItemCount: 4,
    // placeholder: true,
    // placeholderValue: 'fff',
  });
}

export { initSelect };
