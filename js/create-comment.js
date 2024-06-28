// Создание комменитариев
import { library } from './library-thumbnail.js';
import { isEscapeKey } from './utils.js';

const bigPictureBlock = document.querySelector('.big-picture');
const buttonClose = bigPictureBlock.querySelector('.big-picture__cancel');

const commentsBlock = document.querySelector('.social__comments');
const commentList = commentsBlock.querySelectorAll('li');
const removeChildrens = () => {
  while (commentsBlock.firstChild) {
    commentsBlock.removeChild(commentsBlock.firstChild);
  }
};

const picturesBlock = document.querySelector('.pictures');

const MoreCommentsBtn = document.querySelector('.comments-loader');

// Поведение при нажатии Esc
const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    removeChildrens();
  }
};

// Удаляем ноды
commentList.forEach((elem) =>{
  elem.parentNode.removeChild(elem);
});

const commentItem = document.querySelector('#comment')
  .content
  .querySelector('.social__comment');

function openUserModal (evt) {
  if (evt.target.matches('.picture__img')) {

    // Ищем соответствие в библиотеке данных о фотографиях
    const targetId = evt.target.dataset.id;
    const targetIndex = library.findIndex((element) => String(element.id) === targetId);

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
    renderComments(library[targetIndex].comments);

    const newCommentList = Array.from(commentsBlock.querySelectorAll('li'));

    const step = 5;
    let item = 0;
    let commitsPartOne = newCommentList.slice(item, item + step);

    const toggleCommnts = () => {
      newCommentList.forEach((element) => {
        element.style.display = 'none';
      });
      commitsPartOne.forEach((element) => {
        element.style.display = 'flex';
      });
    };

    toggleCommnts();

    MoreCommentsBtn.addEventListener('click', () => {
      item += step;
      commitsPartOne = newCommentList.slice(item, item + step);
      commitsPartOne.forEach((element) => {
        element.style.display = 'none';
      });
      toggleCommnts();

    });


  }
  document.addEventListener('keydown', onDocumentKeydown);
}


function closeUserModal () {

  removeChildrens();
}

picturesBlock.addEventListener('click', openUserModal);
buttonClose.addEventListener('click', closeUserModal);