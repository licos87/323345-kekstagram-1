// Создание библиотеки данных о фотографиях

import { similarImages } from './create-photos.js';

const libraryThumbnail = [];

/**
 * Функция создания данных библиотеки изображений. Данные берет из симуляции данных об изображениях (similarImg), на входе деструтуризирует их.
 * @param {id} similarImages.id
 * @param {url} similarImages.url
 * @param {description} similarImages.description
 * @param {likes} similarImages.likes
 * @param {comments} similarImages.comments
 * @returns { [] } Возвращает массив данных
 */
const dataImg = (({id, url, description, likes, comments}) => {
  const dataImgElement = [];
  dataImgElement.id = id;
  dataImgElement.src = url;
  dataImgElement.alt = description;
  dataImgElement.likes = likes;
  dataImgElement.comments = comments;
  dataImgElement.comments.avatar = comments.avatar;
  dataImgElement.comments.name = comments.name;
  dataImgElement.comments.message = comments.message;

  return dataImgElement;
});


/**
 *
 * @param { similarImages } Получает на входе симулированные изображения
 * @returns  { [] } Возвращает массив данных на основе similarImg
 */
const renderLibrary = (pictures) => {
  // Обрабатывает каждое изображение и добавляет результат в массив библотеки.
  pictures.forEach((picture) => {
    libraryThumbnail.push(dataImg(picture));
  });

  return libraryThumbnail;
};

const images = renderLibrary(similarImages);

export { images };
