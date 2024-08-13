// Создание миниатюр изображений

const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const picturesBlock = document.querySelector('.pictures');

const filters = document.querySelector('.img-filters');

/**
 * Создает шаблон на создание миниатюры. Данные берет из симуляции данных об изображениях (similarImg), на входе деструтуризирует их.
 * @param {id} similarImg.id
 * @param {url} similarImg.url
 * @param {description} similarImg.description
 * @param {likes} similarImg.likes
 * @param {comments} similarImg.comments
 * @returns {cloneNode} Возвращает ноду html разметки из pictureTemplate
 */
const createImg = (({id, url, description, likes, comments}) => {
  const imgElement = pictureTemplate.cloneNode(true);

  imgElement.querySelector('.picture__img').setAttribute('data-id', id);
  imgElement.querySelector('.picture__img').src = url;
  imgElement.querySelector('.picture__img').alt = description;
  imgElement.querySelector('.picture__likes').textContent = likes;
  imgElement.querySelector('.picture__comments').textContent = comments.length;

  return imgElement;
});

/**
 *  Функция на рендер комплекта миниатюр.
 * @param { function() } Получает на вход результат выполнения симуляции данных об изображениях.
 */
const renderThumbnail = (images) => {
  const thumbnailFragment = document.createDocumentFragment();

  images.forEach((image) => {
    const thumbnail = createImg(image);
    thumbnailFragment.append(thumbnail);
  });
  // Добавялет в html разметку в виде document.fragment
  picturesBlock.append(thumbnailFragment);

  filters.classList.remove('img-filters--inactive');
};

export { renderThumbnail };
