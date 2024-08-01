import { resetScale } from './upload-files.js';
import { resetEffects } from './effects.js';
import { sendData } from './api.js';
import { renderErrorMessage, renderSuccessMessage } from './error.js';

const MAX_HASHTAG_COUNT = 5;
const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const TAG_ERROR_TEXT = 'Должен начинаться с решетки (#), Макисмальная длинна одного хэш-тега 20 символов, Pазделяются пробелами, Hе может состоять из одной решетки (#), Не больше 5 хэш-тегов';

const form = document.querySelector('.img-upload__form');
const overlay = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const cancelButton = document.querySelector('#upload-cancel');
const fileFiled = document.querySelector('#upload-file');
const hashtagField = document.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');
const submitButton = document.querySelector('.img-upload__submit');

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикую...'
};

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error',
});

/**
 * Отображает модальное окно
 */
const showModal = () => {
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocKeydown);
};


/**
 * Скрывает модальное окно, сбрасывает все эффекты.
 */
const hideModal = () => {
  form.reset();
  resetScale();
  resetEffects();
  pristine.reset();
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocKeydown);
};


/**
 * Проверяет в фокусе ли поля ввода.
 * @returns Boolean
 */
const isTextFieldFocused = () =>
  document.activeElement === hashtagField || document.activeElement === commentField;

/**
 * Поведение при нажатии Escape.
 * @param {*} evt
 */
function onDocKeydown(evt) {
  if (!isTextFieldFocused() && evt.key === 'Escape' && !isTextFieldFocused()) {
    evt.preventDefault();
    hideModal();
  }
}

const onCancelButtonClick = () => {
  hideModal();
};

const onFileInputChange = () => {
  showModal();
};

const isValidTag = (tag) => VALID_SYMBOLS.test(tag);

const hasValidCount = (tags) => tags.length <= MAX_HASHTAG_COUNT;

const hasUniqueTags = (tags) => {
  const lowerCaseTags = tags.map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

const validateTags = (value) => {
  const tags = value
    .trim()
    .split(' ')
    .filter((tag) => tag.trim().length);
  return hasValidCount(tags) && hasUniqueTags(tags) && tags.every(isValidTag);
};

pristine.addValidator(
  hashtagField,
  validateTags,
  TAG_ERROR_TEXT
);

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

const setUserFormSubmit = (onSuccess) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(new FormData(evt.target))
        .then(() => {
          onSuccess();
          renderSuccessMessage();
        })
        .catch(
          () => {
            document.removeEventListener('keydown', onDocKeydown);
            renderErrorMessage();
          }
        )
        .finally(() => {
          unblockSubmitButton();
          setTimeout(() => {
            document.addEventListener('keydown', onDocKeydown);
          }, 2000);
        });
    }
  });
};

fileFiled.addEventListener('change', onFileInputChange);
cancelButton.addEventListener('click', onCancelButtonClick);


export { hideModal, setUserFormSubmit };
