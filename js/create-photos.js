// Создание группы данных об изображениях
import { getData } from './api.js';

const posts = await getData();

const createComments = (comment) => ({
  id: comment.id,
  avatar: `../${comment.avatar}`,
  message: comment.message,
  name: comment.name,
});

const createPhotos = (post) => ({
  id: post.id,
  url: `../${ post.url }`,
  description: post.description,
  likes: post.likes,
});


const similarPhotos = posts.map(
  (post) => {
    const commentList = [];
    post.comments.forEach((comment) => {
      const newComment = createComments(comment);
      return commentList.push(newComment);
    });

    const photo = createPhotos(post);
    photo.comments = commentList;
    return photo;
  });

const similarImages = Array.from(similarPhotos);

export { similarImages };
