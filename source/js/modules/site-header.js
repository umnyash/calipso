/* * * * * * * * * * * * * * * * * * * * * * * *
 * site-header.js
 */
function initSiteHeader(headerElement) {
  const pageInnerElement = document.querySelector('.page__inner');
  const toggleButtonElement = headerElement.querySelector('.site-header__menu-button');
  const navigationElement = headerElement.querySelector('.site-header__navigation');

  const laptopWidthMediaQueryList = window.matchMedia(LAPTOP_WIDTH_MEDIA_QUERY);

  toggleButtonElement.addEventListener('click', () => {
    toggleButtonElement.classList.toggle('site-header__menu-button--close');
    toggleButtonElement.ariaExpanded = toggleButtonElement.ariaExpanded === 'true' ? 'false' : 'true';
    navigationElement.classList.toggle('site-header__navigation--open');
    headerElement.classList.toggle('page__site-header--expand');
    togglePageScroll();
  });

  const groupsElement = navigationElement.querySelector('.site-navigation__panels');
  const backButtonElement = navigationElement.querySelector('.site-navigation__back-button');
  const titleElement = navigationElement.querySelector('.site-navigation__title');
  const closeButtonElement = navigationElement.querySelector('.site-navigation__close-button');

  closeButtonElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    navigationElement.classList.remove('site-header__navigation--open');
    headerElement.classList.remove('page__site-header--expand');
    toggleButtonElement.classList.remove('site-header__menu-button--animated');
    toggleButtonElement.classList.remove('site-header__menu-button--close');
    toggleButtonElement.ariaExpanded = 'false';
    pageInnerElement.classList.remove('scroll-lock');
  });

  const firstPanelOpener = navigationElement.querySelector('.site-navigation__top-link--opener');
  let activePanelElement = null;
  let activePanelOpenerElement = null;
  let openedItemElement = null;

  if (!activePanelElement && laptopWidthMediaQueryList.matches) {
    openPanel(firstPanelOpener);
  }

  laptopWidthMediaQueryList.addEventListener('change', () => {
    if (!activePanelElement && laptopWidthMediaQueryList.matches) {
      openPanel(firstPanelOpener);
    }
  });

  navigationElement.addEventListener('click', (evt) => {
    if (!laptopWidthMediaQueryList.matches) {
      const panelOpenerElement = evt.target.closest('.site-navigation__top-link--opener');
      const bottomMenuOpenerElement = evt.target.closest('.site-navigation__middle-link--opener');

      if (panelOpenerElement) {
        evt.preventDefault();

        openPanel(panelOpenerElement);
      }

      if (bottomMenuOpenerElement) {
        evt.preventDefault();

        if (openedItemElement) {
          closeBottomMenu();
        }

        openBottomMenu(bottomMenuOpenerElement);
      }
    }
  });

  navigationElement.addEventListener('mouseover', (evt) => {
    if (laptopWidthMediaQueryList.matches) {
      const panelOpenerElement = evt.target.closest('.site-navigation__top-link--opener');

      if (panelOpenerElement) {
        openPanel(panelOpenerElement);
      }
    }
  });

  backButtonElement.addEventListener('click', (evt) => {
    evt.preventDefault();

    if (openedItemElement) {
      closeBottomMenu();
    } else if (activePanelElement) {
      closePanel();
    }
  });

  function openPanel(panelOpenerElement) {
    const panelElement = groupsElement.querySelector(`#${panelOpenerElement.dataset.panelId}`);

    if (panelElement) {
      if (activePanelElement) {
        closePanel();
      }

      if (openedItemElement) {
        closeBottomMenu();
      }

      titleElement.textContent = panelOpenerElement.textContent;
      panelOpenerElement.classList.add('site-navigation__top-link--active');
      panelElement.classList.add('site-navigation__panel--active');
      navigationElement.classList.add('site-navigation--inside');

      activePanelElement = panelElement;
      activePanelOpenerElement = panelOpenerElement;
    }
  }

  function closePanel() {
    activePanelElement.classList.remove('site-navigation__panel--active');
    activePanelOpenerElement.classList.remove('site-navigation__top-link--active');
    navigationElement.classList.remove('site-navigation--inside');

    activePanelElement = null;
    activePanelOpenerElement = null;
  }

  function openBottomMenu(bottomMenuOpenerElement) {
    if (openedItemElement) {
      closeBottomMenu();
    }

    titleElement.textContent = bottomMenuOpenerElement.textContent;
    openedItemElement = bottomMenuOpenerElement.parentElement;
    const adjacentItemElements = openedItemElement.parentElement.children;

    openedItemElement.classList.add('site-navigation__item--opened');

    for (const itemElement of adjacentItemElements) {
      if (itemElement === openedItemElement) {
        continue;
      }

      itemElement.classList.add('site-navigation__item--hidden');
    }
  }

  function closeBottomMenu() {
    openedItemElement.classList.remove('site-navigation__item--opened');
    const adjacentItemElements = openedItemElement.parentElement.children;
    titleElement.textContent = activePanelOpenerElement?.textContent;

    for (const itemElement of adjacentItemElements) {
      if (itemElement === openedItemElement) {
        continue;
      }

      itemElement.classList.remove('site-navigation__item--hidden');
    }

    openedItemElement = null;
  }

  // Скрытие/отображение шапки при скролле
  let pageScrollY = 0;

  const box = document.querySelector('.page__inner');

  const onBoxScroll = () => {
    const headerHeight = headerElement.offsetHeight;

    if (box.scrollTop > 0) {
      headerElement.classList.add('site-header--sticked');
    }

    if (box.scrollTop > pageScrollY && box.scrollTop > headerHeight) {
      headerElement.classList.add('page__site-header--hidden');
    } else {
      headerElement.classList.remove('page__site-header--hidden');

      if (box.scrollTop === 0) {
        headerElement.classList.remove('site-header--sticked');
      }
    }
    pageScrollY = box.scrollTop;
  };

  box.addEventListener('scroll', throttle(onBoxScroll, 100));
}
/* * * * * * * * * * * * * * * * * * * * * * * */
