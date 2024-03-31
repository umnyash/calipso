import { WIDE_TABLET_WIDTH_MEDIA_QUERY } from './const.js';
import { createElementByString } from './util.js';

const productMockData = {
  id: '1',
  title: 'Тумба Mock',
  isPremium: true,
  isFavorite: false,
  status: 'in-stock',
  price: 100,
  discount: 0,
  dimensions: {
    width: '15',
    length: '20',
    height: '60',
  },
  images: ['img/products/product-3.webp', 'img/products/product-3.webp', 'img/products/product-3.webp', 'img/products/product-3.webp', 'img/products/product-3.webp'],
  images2x: ['img/products/product-3@2x.webp', 'img/products/product-3@2x.webp', 'img/products/product-3@2x.webp', 'img/products/product-3@2x.webp', 'img/products/product-3@2x.webp'],
  href: 'product.html',
  brand: 'Calligaris',
  brandHref: 'brand.html',
};

function createProductCardPopupTemplate(product, createProductCardTemplate, productCardModificators) {
  const productCardTemplate = createProductCardTemplate(product, productCardModificators);

  return `
    <div class="product-card-popup pin__popup">
      <div class="product-card-popup__inner">
        <button class="product-card-popup__close-button" type="button"><span class="visually-hidden">Закрыть</span></button>
        ${productCardTemplate}
        <a class="product-card-popup__link" href="${product.href}">Подробнее</a>
      </div>
    </div>
  `;
}

function closeActivePin(pinElement) {
  const POPUP_DISAPPEARANCE_TIME = 100;

  const popupEement = pinElement.querySelector('.pin__popup');
  const buttonElement = pinElement.querySelector('.plus-button');

  popupEement.classList.add('pin__popup--closing');

  setTimeout(() => {
    popupEement.remove();
  }, POPUP_DISAPPEARANCE_TIME);

  buttonElement.classList.remove('plus-button--active');
  pinElement.classList.remove('pin--active');
}

function closeAllActivePins(pinElements) {
  pinElements.forEach((pinElement) => {
    if (pinElement.classList.contains('pin--active')) {
      closeActivePin(pinElement);
    }
  });
}

function initProject(projectElement, createProductCardTemplate, initProductCard, openModal, showAlert) {
  const MIN_INDENT_FROM_WINDOW_EDGE = 100;
  const pinElements = projectElement.querySelectorAll('.pin');

  const getData = async(url, onSuccess, onFail, onFinally) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`${response.status} – ${response.statusText}`);
      }
      const data = await response.json();
      onSuccess(data);
    } catch(err) {
      onFail();
    } finally {
      onFinally();
    }
  };

  projectElement.addEventListener('click', (evt) => {
    const pinButtonElement = evt.target.closest('.plus-button');
    const popupCloseButtonElement = evt.target.closest('.product-card-popup__close-button');

    if (pinButtonElement) {
      const pinElement = pinButtonElement.closest('.pin');

      if (pinButtonElement.classList.contains('plus-button--active')) {
        closeActivePin(pinElement);
      } else {
        closeAllActivePins(pinElements);

        pinButtonElement.disabled = true;

        const productId = pinElement.dataset.productId;
        const actionUrl = `https://fakestoreapi.com/products/${productId}`;

        getData(
          actionUrl,
          (data) => {
            const productData = data && productMockData; // Нужно будет удалить "&& productMockData"
            const popupElement = createElementByString(createProductCardPopupTemplate(productData, createProductCardTemplate, 'product-card--popup'));
            initProductCard(popupElement.querySelector('.product-card'));
            pinElement.append(popupElement);

            pinButtonElement.classList.add('plus-button--active');
            pinElement.classList.add('pin--active');

            const wideTabletWidthMediaQueryList = window.matchMedia(WIDE_TABLET_WIDTH_MEDIA_QUERY);

            if (!wideTabletWidthMediaQueryList.matches) {
              return;
            }

            const popupElementXPosition = popupElement.getBoundingClientRect().x;

            if (popupElementXPosition < MIN_INDENT_FROM_WINDOW_EDGE) {
              const popupInnerElement = popupElement.querySelector('.product-card-popup__inner');
              popupInnerElement.style.transformOrigin = 'left bottom';
              popupElement.style.right = 'auto';
              popupElement.style.left = '20px';
            }
          },
          () => {
            showAlert(openModal, {
              status: 'error',
              heading: 'Ошибка',
              text: 'Не удалось загрузить данные товара, попробуйте снова.'
            });
          },
          () => {
            pinButtonElement.disabled = false;
          }
        );
      }
    }

    if (popupCloseButtonElement) {
      const pinElement = popupCloseButtonElement.closest('.pin');
      closeActivePin(pinElement);
    }
  });
}

export { initProject };
