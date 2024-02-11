import { DESKTOP_WIDTH_MEDIA_QUERY } from './const.js';

// const ANIMATION_DURATION = 300;

const initSiteHeader = (headerElement) => {
  const toggleButtonElement = headerElement.querySelector('.site-header__menu-button');
  const navigationElement = headerElement.querySelector('.site-header__navigation');

  const desktopWidthMediaQueryList = window.matchMedia(DESKTOP_WIDTH_MEDIA_QUERY);

  toggleButtonElement.addEventListener('click', () => {
    toggleButtonElement.classList.remove('site-header__menu-button--animated');

    setTimeout(() => {
      toggleButtonElement.classList.toggle('site-header__menu-button--close');
      toggleButtonElement.classList.add('site-header__menu-button--animated');
    }, 1);

    // if (navigationElement.classList.contains('main-header__navigation--open')) {
    //   setTimeout(() => menuElement.classList.remove('main-header__main-menu--animated'), ANIMATION_DURATION);
    // } else {
    //   menuElement.classList.add('main-header__main-menu--animated');
    // }

    toggleButtonElement.ariaExpanded = toggleButtonElement.ariaExpanded === 'true' ? 'false' : 'true';
    navigationElement.classList.toggle('site-header__navigation--open');
  });

  const groupsElement = navigationElement.querySelector('.site-navigation__panels');
  const backButtonElement = navigationElement.querySelector('.site-navigation__back-button');
  const titleElement = navigationElement.querySelector('.site-navigation__title');

  const firstPanelOpener = navigationElement.querySelector('.site-navigation__top-link--opener');
  let activePanelElement = null;
  let activePanelOpenerElement = null;
  let openedItemElement = null;

  if (!activePanelElement && desktopWidthMediaQueryList.matches) {
    openPanel(firstPanelOpener);
  }

  desktopWidthMediaQueryList.addEventListener('change', () => {
    if (!activePanelElement && desktopWidthMediaQueryList.matches) {
      openPanel(firstPanelOpener);
    }
  });

  navigationElement.addEventListener('click', (evt) => {
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
    const panelElement = groupsElement.querySelector(panelOpenerElement.hash);

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
    titleElement.textContent = activePanelOpenerElement.textContent;

    for (const itemElement of adjacentItemElements) {
      if (itemElement === openedItemElement) {
        continue;
      }

      itemElement.classList.remove('site-navigation__item--hidden');
    }

    openedItemElement = null;
  }
};

export { initSiteHeader };
