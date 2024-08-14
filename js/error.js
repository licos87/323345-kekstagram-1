
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
  const errorInner = errorModal.querySelector('.error__inner');

  const onErrorModalRemove = () => {
    errorModal.remove();
  };

  document.addEventListener('keydown', onErrorModalRemove);
  buttonClose.addEventListener('click', onErrorModalRemove);

  errorModal.addEventListener('click', (evt) => {
    if (evt.target !== errorInner) {
      onErrorModalRemove();
    }
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
  const successInner = successModal.querySelector('.success__inner');

  const onSuccessModalRemove = () => {
    successModal.remove();
  };

  document.addEventListener('keydown', onSuccessModalRemove);
  buttonClose.addEventListener('click', onSuccessModalRemove);

  successModal.addEventListener('click', (evt) => {
    if (evt.target !== successInner) {
      onSuccessModalRemove();
    }
  });
};


export { renderSuccessMessage, renderErrorMessage };
