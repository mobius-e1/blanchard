  const gellerySelect = document.querySelector('.filter-form__select');
  const galleryChoices = new Choices(gellerySelect, {
    searchEnabled: false,
    position: 'bottom',
    itemSelectText: '',
  });

  const choicesList = document.querySelector('.choices__list[role="listbox"]');

  let hideSelected = function() {
    let currentValue = galleryChoices.getValue('value');

    choicesList.childNodes.forEach(e => {
      e.removeAttribute('hidden');

      if (e.getAttribute('data-value') === currentValue) {
        e.setAttribute('hidden', 'true');
        e.removeAttribute('data-choice-selectable','');
      };
    });
  };

  hideSelected();

  gellerySelect.addEventListener('change', () => {
    hideSelected();
  });