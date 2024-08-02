
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

const successTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');


const successElement = successTemplate.cloneNode(true);


const renderSuccessMessage = () => {
  const successFragment = document.createDocumentFragment();
  successFragment.append(successElement);

  messageBlock.append(successFragment);

  const successModal = document.querySelector('.success');
  const buttonClose = document.querySelector('.success__button');

  document.addEventListener('keydown', () => {
    successModal.remove();
  });
  buttonClose.addEventListener('click', () => {
    successModal.remove();
  });

  successModal.addEventListener('click', () => {
    successModal.remove();
  });
};


export { renderSuccessMessage, renderErrorMessage };
