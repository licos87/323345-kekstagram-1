//Создание полноразмерного изображения из миниатюры.

import { imageDatabase } from './imageDatabase.js';
import { isEscapeKey } from './utils.js';

const picturesBlock = document.querySelector('.pictures');
const bigPictureBlock = document.querySelector('.big-picture');
const buttonClose = bigPictureBlock.querySelector('.big-picture__cancel');

// Установка обработчиков события на открытие / закрытие модального окна
picturesBlock.addEventListener('click', onUserModalOpen);

const pictureImgConteniner = bigPictureBlock.querySelector('.big-picture__img');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    onCloseUserModal();
  }
};

const likesCount = document.querySelector('.likes-count');
const commentsCount = document.querySelector('.comments-count');
const socialCaption = document.querySelector('.social__caption');
const body = document.querySelector('body');

/**
 * Поведение при открытии модального окна (Развернутой фотографии)
 * @param {evt.target} evt
 */
function onUserModalOpen (evt) {
  if (evt.target.matches('.picture__img')) {
    bigPictureBlock.classList.remove('hidden');
    pictureImgConteniner.querySelector('img').src = evt.target.src;

    // Ищем соответствие в библиотеке данных о фотографиях
    const targetId = evt.target.dataset.id;

    const targetIndex = imageDatabase.findIndex((element) => String(element.id) === targetId);

    // Присваиваем данные из библиотеки
    likesCount.textContent = imageDatabase[targetIndex].likes;
    commentsCount.textContent = imageDatabase[targetIndex].comments.length;
    socialCaption.textContent = imageDatabase[targetIndex].alt;

    body.classList.add('modal-open');

    // Добавляет слушатели на закрытие окна
    document.addEventListener('keydown', onDocumentKeydown);
    buttonClose.addEventListener('click', onCloseUserModal);
  }
}

/**
 * Поведение при закрытии мадального окна.
 */
function onCloseUserModal () {
  bigPictureBlock.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  buttonClose.removeEventListener('click', onCloseUserModal);
}

export { onDocumentKeydown };

