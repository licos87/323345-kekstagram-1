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
  // comments: commentary,
});


const similarPhotos = posts.map(
  (post) => {
    const commentary = [];
    post.comments.forEach((comment) => {
      const comm = createComments(comment);
      return commentary.push(comm);
    });

    const photo = createPhotos(post);
    photo.comments = commentary;
    return photo;
  });

const similarImages = Array.from(similarPhotos);

export { similarImages };
