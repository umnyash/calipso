const initFolds = (foldsElement) => {
  foldsElement.addEventListener('click', ({ target }) => {
    const buttonElement = target.closest('.folds__button');
    if (!buttonElement) {
      return;
    }

    const foldElement = buttonElement.closest('.folds__item');
    const contentWrapperElement = foldElement.querySelector('.folds__content-wrapper');
    const contentElement = contentWrapperElement.querySelector('.folds__content');

    const contentElementHeight = contentElement.getBoundingClientRect().height;
    contentWrapperElement.style.height = `${contentElementHeight}px`;

    // contentElement.style.position = 'absolute'; // (1)

    setTimeout(() => { // (2)
      foldElement.classList.toggle('folds__item--open');
    }, 20);

    buttonElement.ariaExpanded = buttonElement.ariaExpanded === 'true' ? 'false' : 'true';
  });

  foldsElement.addEventListener('transitionend', ({ target }) => { // (3)
    const foldElement = target.closest('.folds__item');

    if (!foldElement || !foldElement.classList.contains('folds__item--open')) { // (4)
      return;
    }

    if (target.classList.contains('folds__content')) {
      // target.style.position = 'static'; // (5)
    }

    if (target.classList.contains('folds__content-wrapper')) {
      setTimeout(() => { // (5)
        target.style.height = 'auto';
      }, 0);
    }
  });
};

export { initFolds };

/* (1)
 * Зачем менять позиционирование? Это нужно для создания эффекта,
 * что контент выдвигается сверху. При раскрытии складки сначала
 * будет видна нижняя часть контента. Пробовал изменять позиционирование
 * в CSS, как и значение свойства visibility, но не получилось.
 */

/* (2)
 * Такое впечатление, что класс задавался до того, как была задана,
 * вычисленная высота и анимация закрытия не работала. Переключаю
 * класс асинхронно, чтобы он наверняка переключался после того,
 * как была задана высота и это работает.
 */

/* (3)
 * В соответствии со стилями при раскрытии/закрытии складки срабатывают
 * плавные переходы на элементах со следующими классами:
 *
 * folds__button
 * folds__content-wrapper
 * folds__content
 */

/* (4)
 * На данный момент проверка условия !foldElement? не нужна, так как
 * плавные переходы имеются только на элементах внутри элемнта
 * с классом folds__item и таким образом он всегда будет найден
 * при событии transitionend.
 *
 * Но если в будущем появятся плавные переходы на списке
 * (элементе с классом folds), то в переменную foldElement может
 * попадать сам список, событие которого обрабатывать не нужно.
 */

/* (5)
 * Если сначала изменить высоту блока обёртки (folds__content-wrapper) на auto,
 * то он схлопнется, поскольку внутри имеется только АБСОЛЮТНО ПОЗИЦИОНИРОВАННЫЙ
 * блок с контентом (folds__content). Изменив позиционирование блока с контентом
 * на static, блок обёртки снова растянется. Позаботившись о том, чтобы значение
 * высоты обёртки сменилось на auto ПОСЛЕ позицинирования внутреннего контента,
 * я избавляю обёртку от необходимости схлопываться/растягиваться, так как её
 * высота фактически не изменится.
 *
 * Напомню зачем вообще менять высоту на auto. Это нужно, чтобы при изменении
 * ширины вьюпорта высота обёртки могла подстраиваться под высоту контента.
 * В противном случае пришлось бы при изменении ширины вьюпорта писать код,
 * который бы изменял высоту обёртки контента каждой открытой складки.
 *
 * Напомню зачем вообще задавать фиксированную высоту обёртки.
 * Чтобы анимировать. Значение высоты auto не может анимироваться, поэтому вместо
 * него использую значение, вычисленное при открытии/закрытии складки.
 */
