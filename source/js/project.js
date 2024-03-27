import { WIDE_TABLET_WIDTH_MEDIA_QUERY } from './const.js';
import { createElementByString } from './util.js';

const productMockData = {
  id: '1234',
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

function createProductCardPopupTemplate(product) {
  const priceFormatter = new Intl.NumberFormat('ru');
  let price = null;
  let oldPrice = null;

  if (product.discount) {
    oldPrice = priceFormatter.format(product.price);
    price = priceFormatter.format(product.price * (100 - product.discount) / 100);
  } else {
    price = priceFormatter.format(product.price);
  }

  const dimensions = Object.values(product.dimensions).join('х');

  return `
    <div class="product-card-popup pin__popup">
      <div class="product-card-popup__inner">
        <button class="product-card-popup__close-button" type="button"><span class="visually-hidden">Закрыть</span></button>
        <article class="product-card product-card-popup__card product-card--popup">
          <div class="product-card__heading-and-signs">
            <h3 class="product-card__heading">
              <a class="product-card__link" href="${product.href}">${product.title}</a>
            </h3>
            <p class="product-card__signs">${dimensions}</p>
          </div>
          <div class="product-card__prices">
            <p class="product-card__price ${product.discount ? 'accent' : ''}">${price} ₽</p>
            ${product.discount ? `<s class="product-card__old-price">${oldPrice} ₽</s><p class="producr-card__discount">-${product.discount}%</p>` : ''}
          </div>
          <a class="product-card__slider swiper" href="${product.href}">
            <ul class="product-card__slider-list swiper-wrapper">
              ${product.images.map((image, index) => `
                <li class="product-card__slider-item swiper-slide">
                  <img class="product-card__image" src="${image}" srcset="${product.images2x[index]} 2x" alt="" loading="lazy"/>
                </li>
              `).join('')}
            </ul>
            <p class="product-card__slider-pagination"></p>
          </a>
          <div class="product-card__labels-wrapper">
            <div class="product-card__labels">
              ${product.isPremium ? '<p class="product-card__premium-label"><span class="product-card__premium-label-text">Premium</span></p>' : ''}
              ${product.status === 'in-stock' ? '<p class="product-card__label">В наличии</p>' : ''}
              <p class="product-card__like-button-wrapper">
                <button class="like-button product-card__like-button ${product.isFavorite ? 'like-button--active' : ''}" type="button">
                  <span class="visually-hidden">Нравится</span>
                </button>
              </p>
            </div>
          </div>
          <a class="product-card__brand" href="${product.brandHref}">
            Бренд <span class="product-card__brand-name">${product.brand}</span>
          </a>
        </article>
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

function initProject(projectElement, getData, initProductCard, openModal, showAlert) {
  const MIN_INDENT_FROM_WINDOW_EDGE = 100;
  const pinElements = projectElement.querySelectorAll('.pin');

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
        const actionUrl = 'https://echo.htmlacademy.ru'; // url можно будет модифицировать. Например, добавив id товара из дата-атрибута элемента pin.

        getData(
          actionUrl,
          (data) => {
            const productData = data || productMockData;
            const popupElement = createElementByString(createProductCardPopupTemplate(productData));
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
