// Создание комменитариев
import { imageDatabase } from './imageDatabase.js';
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

const onCommentsBlockRemoveChildrens = () => {
  while (commentsBlock.firstChild) {
    commentsBlock.removeChild(commentsBlock.firstChild);
  }
};

// Поведение при нажатии Esc
const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    onCommentsBlockRemoveChildrens();
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
    const createComentItem = ((data) => {
      const commentElement = commentItem.cloneNode(true);

      commentElement.querySelector('.social__picture').src = data.avatar;
      commentElement.querySelector('.social__picture').alt = data.name;
      commentElement.querySelector('.social__text').textContent = data.message;

      return commentElement;
    });

    const commentary = createComentItem(libraryCommentElement);
    commentFragment.append(commentary);
  });
  commentsBlock.append(commentFragment);
};

function onModalOpen (evt) {
  if (evt.target.matches('.picture__img')) {

    // Ищем соответствие в библиотеке данных о фотографиях
    const targetId = evt.target.dataset.id;
    const targetIndex = imageDatabase.findIndex((element) => String(element.id) === targetId);

    renderComments(imageDatabase[targetIndex].comments);

    const newCommentList = Array.from(commentsBlock.querySelectorAll('li'));

    let item = 0;
    let commentsPartOne = newCommentList.slice(item, item + STEP);
    let commentShowSum = commentsPartOne.length;

    const dataBaseCommentsLength = imageDatabase[targetIndex].comments.length;

    moreCommentsBtn.classList.remove('visually-hidden');
    if (commentShowSum >= dataBaseCommentsLength) {
      moreCommentsBtn.classList.add('visually-hidden');
    }

    socialCommentCount.textContent = commentShowSum;
    commentsCount.textContent = dataBaseCommentsLength;

    const toggleCommnts = () => {
      newCommentList.forEach((element) => {
        element.style.display = 'none';
      });
      commentsPartOne.forEach((element) => {
        element.style.display = 'flex';
      });
    };

    toggleCommnts();

    moreCommentsBtn.addEventListener('click', () => {

      item += STEP;
      commentsPartOne = newCommentList.slice(item, item + STEP);
      commentShowSum += commentsPartOne.length;

      moreCommentsBtn.classList.remove('visually-hidden');
      if (commentShowSum >= dataBaseCommentsLength) {
        moreCommentsBtn.classList.add('visually-hidden');
      }

      socialCommentCount.textContent = commentShowSum;
      commentsCount.textContent = dataBaseCommentsLength;

      commentsPartOne.forEach((element) => {
        element.style.display = 'none';
      });
      toggleCommnts();
    });
  }
  document.addEventListener('keydown', onDocumentKeydown);
}


function onModalClose () {

  onCommentsBlockRemoveChildrens();
}

picturesBlock.addEventListener('click', onModalOpen);
buttonClose.addEventListener('click', onModalClose);
