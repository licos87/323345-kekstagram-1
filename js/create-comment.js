// Создание комменитариев
import { images } from './images.js';
import { isEscapeKey } from './utils.js';

const STEP = 5;

const bigPictureBlock = document.querySelector('.big-picture');
const buttonClose = bigPictureBlock.querySelector('.big-picture__cancel');

const commentsBlock = document.querySelector('.social__comments');
const commentList = commentsBlock.querySelectorAll('li');
const picturesBlock = document.querySelector('.pictures');
const moreCommentsBtn = document.querySelector('.comments-loader');

const socialCommentCount = document.querySelector('.comments-step');
const commentsCount = document.querySelector('.comments-count');

const removeComments = () => {
  while (commentsBlock.firstChild) {
    commentsBlock.removeChild(commentsBlock.firstChild);
  }
};

// Поведение при нажатии Esc
const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    removeComments();
  }
};

// Удаляем ноды
commentList.forEach((elem) =>{
  elem.parentNode.removeChild(elem);
});

const commentItem = document.querySelector('#comment')
  .content
  .querySelector('.social__comment');

const renderComments = (libraryCommentElements) => {
  const commentFragment = document.createDocumentFragment();

  libraryCommentElements.forEach((libraryCommentElement) => {
    const createCommentItem = ((data) => {
      const commentElement = commentItem.cloneNode(true);

      commentElement.querySelector('.social__picture').src = data.avatar;
      commentElement.querySelector('.social__picture').alt = data.name;
      commentElement.querySelector('.social__text').textContent = data.message;

      return commentElement;
    });

    const comment = createCommentItem(libraryCommentElement);
    commentFragment.append(comment);
  });
  commentsBlock.append(commentFragment);
};

function onModalOpen (evt) {
  if (evt.target.matches('.picture__img')) {

    // Ищем соответствие в библиотеке данных о фотографиях
    const targetId = evt.target.dataset.id;
    const targetIndex = images.findIndex((element) => String(element.id) === targetId);

    renderComments(images[targetIndex].comments);

    const newCommentList = Array.from(commentsBlock.querySelectorAll('li'));

    let item = 0;
    let commentsPartOne = newCommentList.slice(item, item + STEP);
    let commentShowSum = commentsPartOne.length;

    const dataBaseCommentsLength = images[targetIndex].comments.length;

    moreCommentsBtn.classList.remove('visually-hidden');
    if (commentShowSum >= dataBaseCommentsLength) {
      moreCommentsBtn.classList.add('visually-hidden');
    }

    socialCommentCount.textContent = commentShowSum;
    commentsCount.textContent = dataBaseCommentsLength;

    const toggleComments = () => {
      newCommentList.forEach((element) => {
        element.style.display = 'none';
      });
      commentsPartOne.forEach((element) => {
        element.style.display = 'flex';
      });
    };

    toggleComments();

    moreCommentsBtn.addEventListener('click', () => {

      item += STEP;
      commentsPartOne = newCommentList.slice(0, item + STEP);
      commentShowSum += newCommentList.slice(item, item + STEP).length;

      moreCommentsBtn.classList.remove('visually-hidden');
      if (commentShowSum >= dataBaseCommentsLength) {
        moreCommentsBtn.classList.add('visually-hidden');
      }

      socialCommentCount.textContent = commentShowSum;
      commentsCount.textContent = dataBaseCommentsLength;

      // commentsPartOne.forEach((element) => {
      //   element.style.display = 'none';
      // });
      toggleComments();
    });
  }
  document.addEventListener('keydown', onDocumentKeydown);
}

function onModalClose () {

  removeComments();
  document.removeEventListener('keydown', onDocumentKeydown);
}

picturesBlock.addEventListener('click', onModalOpen);
buttonClose.addEventListener('click', onModalClose);
