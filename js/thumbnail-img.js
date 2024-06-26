const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const picturesBlock = document.querySelector('.pictures');

const createImg = (({url, description, likes, comments}) => {
  const imgElement = pictureTemplate.cloneNode(true);
  imgElement.querySelector('.picture__img').src = url;
  imgElement.querySelector('.picture__img').alt = description;
  imgElement.querySelector('.picture__likes').textContent = likes;
  imgElement.querySelector('.picture__comments').textContent = comments.length;

  return imgElement;
});

const renderThumbnail = (images) => {
  const thumbnailFragment = document.createDocumentFragment();

  images.forEach((image) => {
    const thumbnail = createImg(image);
    thumbnailFragment.append(thumbnail);
  });

  picturesBlock.append(thumbnailFragment);
};

export { renderThumbnail };
