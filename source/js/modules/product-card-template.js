/* * * * * * * * * * * * * * * * * * * * * * * *
 * product-card-template.js
 */
function createProductCardTemplate(product, modificators) {
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
    <article class="product-card product-card-popup__card ${modificators ? modificators : ''}">
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
  `;
}
/* * * * * * * * * * * * * * * * * * * * * * * */
