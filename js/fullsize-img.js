//Создание полноразмерного изображения из миниатюры.

import { library } from './library-thumbnail.js';
import { isEscapeKey } from './utils.js';

const picturesBlock = document.querySelector('.pictures');
const bigPictureBlock = document.querySelector('.big-picture');
const buttonClose = bigPictureBlock.querySelector('.big-picture__cancel');

// Установка обработчиков события на открытие / закрытие модального окна
picturesBlock.addEventListener('click', openUserModal);

const pictureImgConteniner = bigPictureBlock.querySelector('.big-picture__img');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUserModal();
  }
};

/**
 * Поведение при открытии модального окна (Развернутой фотографии)
 * @param {evt.target} evt
 */
function openUserModal (evt) {
  if (evt.target.matches('.picture__img')) {
    bigPictureBlock.classList.remove('hidden');
    pictureImgConteniner.querySelector('img').src = evt.target.src;

    // Ищем соответствие в библиотеке данных о фотографиях
    const targetId = evt.target.dataset.id;

    const targetIndex = library.findIndex((element) => String(element.id) === targetId);

    // Присваиваем данные из библиотеки
    document.querySelector('.likes-count').textContent = library[targetIndex].likes;
    document.querySelector('.comments-count').textContent = library[targetIndex].comments.length;
    document.querySelector('.social__caption').textContent = library[targetIndex].alt;
    //Скрываем лишние элементы
    document.querySelector('body').classList.add('modal-open');

    document.addEventListener('keydown', onDocumentKeydown);
    buttonClose.addEventListener('click', closeUserModal);
  }
}

/**
 * Поведение при закрытии мадального окна.
 */
function closeUserModal () {
  bigPictureBlock.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
  document.querySelector('body').classList.remove('modal-open');
  buttonClose.removeEventListener('click', closeUserModal);
}


