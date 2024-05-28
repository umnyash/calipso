function initButtonPrintPdf(buttonElement) {
  const documentUrl = buttonElement.dataset.url;

  buttonElement.addEventListener('click', () => {
    buttonElement.disabled = true;
    buttonElement.classList.add('document-actions__button--pending');
    const iframeElement = document.createElement('iframe');
    iframeElement.style.display = 'none';

    iframeElement.addEventListener('load', () => {
      iframeElement.contentWindow.print();
      buttonElement.classList.remove('document-actions__button--pending');
      buttonElement.disabled = false;
    });

    iframeElement.src = documentUrl;
    document.body.appendChild(iframeElement);
  });
}
