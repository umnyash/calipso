/* * * * * * * * * * * * * * * * * * * * * * * *
 * search-modal.js
 */
// const searchResultMockData = {
//   products: [
//     {
//       id: '1',
//       title: 'Стул Tosca',
//       isPremium: true,
//       isFavorite: false,
//       price: 12000,
//       discount: 0,
//       images: ['img/products/product-1.webp', 'img/products/product-1.webp', 'img/products/product-1.webp', 'img/products/product-1.webp', 'img/products/product-1.webp'],
//       href: 'product.html',
//       brand: 'Calligaris',
//       brandHref: 'brand.html',
//     },
//     {
//       id: '2',
//       title: 'Стул Tosca',
//       isPremium: true,
//       isFavorite: false,
//       status: 'in-stock',
//       price: 15000,
//       discount: 0,
//       dimensions: '15x20x60',
//       images: ['img/products/product-2.webp', 'img/products/product-2.webp', 'img/products/product-2.webp', 'img/products/product-2.webp', 'img/products/product-2.webp'],
//       href: 'product.html',
//       brand: 'Calligaris',
//       brandHref: 'brand.html',
//     },
//     {
//       id: '3',
//       title: 'Тумба Mock',
//       isPremium: true,
//       isFavorite: false,
//       status: 'arrival-expected',
//       price: 20000,
//       discount: 10,
//       dimensions: '15x20x60',
//       images: ['img/products/product-3.webp', 'img/products/product-3.webp', 'img/products/product-3.webp', 'img/products/product-3.webp', 'img/products/product-3.webp'],
//       href: 'product.html',
//       brand: 'Calligaris',
//       brandHref: 'brand.html',
//     },
//     {
//       id: '1',
//       title: 'Стул Tosca',
//       isPremium: true,
//       isFavorite: false,
//       status: 'to-order',
//       price: 12000,
//       discount: 0,
//       dimensions: '15x20x60',
//       images: ['img/products/product-1.webp', 'img/products/product-1.webp', 'img/products/product-1.webp', 'img/products/product-1.webp', 'img/products/product-1.webp'],
//       href: 'product.html',
//       brand: 'Calligaris',
//       brandHref: 'brand.html',
//     },
//     {
//       id: '2',
//       title: 'Стул Tosca',
//       isPremium: true,
//       isFavorite: false,
//       status: 'arrival-expected',
//       price: 15000,
//       discount: 0,
//       dimensions: '15x20x60',
//       images: ['img/products/product-2.webp', 'img/products/product-2.webp', 'img/products/product-2.webp', 'img/products/product-2.webp', 'img/products/product-2.webp'],
//       href: 'product.html',
//       brand: 'Calligaris',
//       brandHref: 'brand.html',
//     },
//     {
//       id: '2',
//       title: 'Стул Tosca',
//       isPremium: true,
//       isFavorite: false,
//       status: 'to-order',
//       price: 15000,
//       discount: 0,
//       dimensions: '15x20x60',
//       images: ['img/products/product-2.webp', 'img/products/product-2.webp', 'img/products/product-2.webp', 'img/products/product-2.webp', 'img/products/product-2.webp'],
//       href: 'product.html',
//       brand: 'Calligaris',
//       brandHref: 'brand.html',
//     },
//   ],
//   articles: [
//     {
//       title: 'Смена экспозиции в&nbsp;выставочном зале',
//       type: 'Блог',
//       image: 'img/articles/previews/preview-1.webp',
//       image2x: 'img/articles/previews/preview-1@2x.webp 2x',
//       date: '2023-05-10',
//       href: 'article.html',
//     },
//   ],
// };

class SearchModal {
  #maxListItemsCount = 4;
  #modalElement = null;
  #openModal = null;
  #modalContentElement = null;
  #controlElement = null;
  #formElement = null;
  #resultElement = null;
  #createProductCardTemplate = null;
  #initProductCard = null;
  #createArticlePreviewTemplate = null;

  constructor({ modalElement, openModal, createProductCardTemplate, initProductCard, createArticlePreviewTemplate }) {
    this.#modalElement = modalElement;
    this.#openModal = openModal;
    this.#createProductCardTemplate = createProductCardTemplate;
    this.#initProductCard = initProductCard;
    this.#createArticlePreviewTemplate = createArticlePreviewTemplate;
  }

  #sendData = async (url, body, onSuccess, onFail) => {
    try {
      const response = await fetch(url, {
        method: 'POST',
        body,
      });
      if (!response.ok) {
        throw new Error(`${response.status} – ${response.statusText}`);
      }
      const data = await response.json();
      onSuccess(data);
    } catch (err) {
      onFail();
    }
  };

  #onModalClick = (evt) => {
    const clearButton = evt.target.closest('.text-field__clear-button');
    const popularLink = evt.target.closest('.search-modal__popular-list-link');

    if (clearButton) {
      this.#controlElement.value = '';
      this.#controlElement.focus();
      this.#controlElement.dispatchEvent(new Event('input', {
        bubbles: true,
      }));
    }

    if (popularLink) {
      this.#controlElement.value = popularLink.textContent;
      this.#controlElement.focus();
      this.#controlElement.dispatchEvent(new Event('input', {
        bubbles: true,
      }));
    }
  };

  #createResultGroupTemplate(groupTitle, moreResultsLinkHref, list) {
    const moreResultsLink = `
      <a class="search-modal__result-group__link link link--small" href="${moreResultsLinkHref}">Ещё результаты</a>
    `;

    return `
      <section class="search-modal__result-group">
        <header class="search-modal__result-group-header">
          <h3 class="search-modal__result-group-heading">По вашему запросу найдены «${groupTitle}»</h3>
          ${moreResultsLinkHref ? moreResultsLink : ''}
        </header>
        ${list}
      </section>
    `;
  }

  #showSearchResults = () => {
    if (this.#controlElement.value.trim().length < 3) {
      this.#modalContentElement.classList.remove('search-modal--with-result');
      this.#resultElement.innerHTML = '';
      return;
    }

    this.#modalContentElement.classList.add('search-modal--with-result');
    const actionUrl = this.#formElement.getAttribute('action');

    this.#sendData(
      actionUrl,
      new FormData(this.#formElement),
      (data) => {
        this.#resultElement.innerHTML = '';
        const searchResult = data;

        if (!searchResult?.products?.length && !searchResult?.articles?.length) {
          this.#resultElement.insertAdjacentHTML('beforeend', '<p class="search-modal__result-placeholder">По вашему запросу ничего не найдено</p>');
          return;
        }

        if (searchResult?.products?.length) {
          const productsListTemplate = `
            <ul class="products-list products-list--size_xs search-modal__result-group-list">
              ${searchResult.products.slice(0, this.#maxListItemsCount).map((product) => this.#createProductCardTemplate(product, 'product-card--size_xs')).join('')}
            </ul>
          `;

          const moreResultsLinkHref = searchResult.products.length > this.#maxListItemsCount
            ? `/search_articles/?q${this.#controlElement.value.trim()}`
            : null;

          const resultGroupTemplate = this.#createResultGroupTemplate('Товары', moreResultsLinkHref, productsListTemplate);
          const resultGroupElement = createElementByString(resultGroupTemplate);
          resultGroupElement.querySelectorAll('.product-card').forEach(this.#initProductCard);
          this.#resultElement.append(resultGroupElement);
        }

        if (searchResult?.articles?.length) {
          const articlesListTemplate = `
            <ul class="articles-list articles-list--size_s search-modal__result-group-list">
              ${searchResult.articles.map((article) => this.#createArticlePreviewTemplate(article, 'article-preview--size_s')).join('')}
            </ul>
          `;

          const moreResultsLinkHref = searchResult.articles.length > this.#maxListItemsCount
            ? `/search/?q=${this.#controlElement.value.trim()}`
            : null;

          const resultGroupTemplate = this.#createResultGroupTemplate('Статьи', moreResultsLinkHref, articlesListTemplate);
          const resultGroupElement = createElementByString(resultGroupTemplate);
          this.#resultElement.append(resultGroupElement);
        }
      },
      () => {
        this.#resultElement.innerHTML = '';
        this.#resultElement.insertAdjacentHTML('beforeend', '<p class="search-modal__result-placeholder search-modal__result-placeholder--error">Ошибка. Не удалось произвести поиск.</p>');
      },
    );
  };

  #onControlInput = debounce(this.#showSearchResults, 500);

  open = (evt) => {
    evt.preventDefault();
    this.#openModal(this.#modalElement);
    this.#modalElement.querySelector('input').focus();
  };

  init = () => {
    this.#modalContentElement = this.#modalElement.querySelector('.search-modal');
    this.#formElement = this.#modalContentElement.querySelector('.search-modal__form');
    this.#controlElement = this.#formElement.querySelector('.text-field__control');
    this.#resultElement = this.#modalContentElement.querySelector('.search-modal__result');

    document.querySelectorAll('[data-modal-opener="search"]').forEach((openerElement) => {
      openerElement.addEventListener('click', this.open);
    });

    this.#modalContentElement.addEventListener('click', this.#onModalClick);
    this.#controlElement.addEventListener('input', this.#onControlInput);
  };
}

function initSearchModal(modalElement, openModal, createProductCardTemplate, initProductCard, createArticlePreviewTemplate) {
  const searchModal = new SearchModal({ modalElement, openModal, createProductCardTemplate, initProductCard, createArticlePreviewTemplate });

  searchModal.init();

  return searchModal;
}
/* * * * * * * * * * * * * * * * * * * * * * * */
