function createArticlePreviewTemplate(article, modificators) {
  const dateFormatter = new Intl.DateTimeFormat('ru', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const date = dateFormatter.format(Date.parse(article.date)).replace(/ г.$/, '');

  return `
    <li class="article-preview ${modificators ? modificators : ''}">
      <h3 class="article-preview__heading">
        <a class="article-preview__link" href="${article.href}">${article.title}</a>
      </h3>
      <p class="article-preview__label">${article.type}</p>
      <picture class="article-preview__image-wrapper">
        <img class="article-preview__image" src="${article.image}" srcset="${article.image2x} 2x" alt="" loading="lazy"/>
      </picture>
      <time class="article-preview__date" datetime="${article.date}">${date}</time>
    </li>
  `;
}

export { createArticlePreviewTemplate };
