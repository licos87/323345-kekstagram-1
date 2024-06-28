// Создание библиотеки данных о фотографиях

import { similarImg } from './create-photos.js';
const libraryThumbnail = [];

/**
 * Функция создания данных библиотеки изображений. Данные берет из симуляции данных об изображениях (similarImg), на входе деструтуризирует их.
 * @param {id} similarImg.id
 * @param {url} similarImg.url
 * @param {description} similarImg.description
 * @param {likes} similarImg.likes
 * @param {comments} similarImg.comments
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
 * @param { similarImg } Получает на входе симулированные изображения
 * @returns  { [] } Возвращает массив данных на основе similarImg
 */
const renderLibrary = (images) => {
  // Обрабатывает каждое изображение и добавляет результат в массив библотеки.
  images.forEach((image) => {
    libraryThumbnail.push(dataImg(image));
  });

  return libraryThumbnail;
};

const library = renderLibrary(similarImg);

export { library };
