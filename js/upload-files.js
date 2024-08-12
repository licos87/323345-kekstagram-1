import { isEscapeKey } from './utils.js';
import { resetEffects } from './effects.js';

const SCALE_BASE = 1;
const SCALE_STEP = 0.25;
const SCALE_MIN = 0.25;
const SCALE_MAX = 1;

const uploadFile = document.querySelector('#upload-file');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const imgUploadPreview = document.querySelector('.img-upload__preview');
const img = imgUploadPreview.querySelector('img');
const buttonClose = document.querySelector('#upload-cancel');

const scaleBigger = document.querySelector('.scale__control--bigger');
const scaleSmaller = document.querySelector('.scale__control--smaller');
const scaleValue = document.querySelector('.scale__control--value');

let newScale = SCALE_BASE;

// Изменение масштаба изображения
const onBiggerButtonClick = () => {
  if ((newScale + SCALE_STEP) <= SCALE_MAX) {
    newScale += SCALE_STEP;
    img.style.transform = `scale(${newScale})`;
    scaleValue.value = `${newScale * 100}%`;
  }
};

const onSmallerButtonClick = () => {
  if ((newScale - SCALE_STEP) >= SCALE_MIN) {
    newScale -= SCALE_STEP;
    img.style.transform = `scale(${newScale})`;
    scaleValue.value = `${newScale * 100}%`;
  }
};

// Сбрасывает маштабирование изображения
const resetScale = () => {
  newScale = SCALE_BASE;
  img.style.transform = `scale(${newScale})`;
};


// Загрузка изображения пользователем + закрытие модального окна.
const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUserModal();
  }
};

const onUploadFileChange = () => {
  imgUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');

  // Меняем изображение просмотра на загруженное изображение
  const file = uploadFile.files[0];
  const reader = new FileReader();
  const onImgPathRead = () => {
    img.src = reader.result;
  };
  reader.addEventListener(
    'load',
    onImgPathRead,
    false,
  );

  if (file) {
    reader.readAsDataURL(file);
  }
};

uploadFile.addEventListener('change', onUploadFileChange);
// Добавляет слушатели на закрытие окна.

const onButtonCloseClick = () => {
  resetEffects();
  closeUserModal();
};

buttonClose.addEventListener('click', onButtonCloseClick);

// Добавляет слушатели на кнопки маштабирования.
scaleBigger.addEventListener('click', onBiggerButtonClick);
scaleSmaller.addEventListener('click', onSmallerButtonClick);


function closeUserModal () {
  imgUploadOverlay.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  buttonClose.removeEventListener('click', closeUserModal);
}

export { resetScale };
