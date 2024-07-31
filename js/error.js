
const errorTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');

const messageBlock = document.querySelector('body');


const errorElement = errorTemplate.cloneNode(true);


const renderErrorMessage = () => {
  const errorFragment = document.createDocumentFragment();
  errorFragment.append(errorElement);

  messageBlock.append(errorFragment);

  const errorModal = document.querySelector('.error');
  const buttonClose = document.querySelector('.error__button');

  document.addEventListener('keydown', () => {
    errorModal.remove();
  });
  buttonClose.addEventListener('click', () => {
    errorModal.remove();
  });

  errorModal.addEventListener('click', () => {
    errorModal.remove();
  });
};

export { renderErrorMessage };
