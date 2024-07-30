const response = await fetch('https://28.javascript.htmlacademy.pro/kekstagram/data');
const posts = await response.json();
console.log(`Статус выполнения ${response.status}`);

console.log(posts);


// const createComments = (comment) => ({
//   id: comment.id,
//   avatar: `../${comment.avatar}`,
//   message: comment.message,
//   name: comment.name,
// });

// const createPhotos = (post) => ({
//   id: post.id,
//   url: `../${ post.url }`,
//   description: post.description,
//   likes: post.likes,
//   // comments: createComments(),
// });

// posts.forEach((post) => {
//   createPhotos(post);
//   post.comments.forEach((comment) => {
//     createComments(comment);
//   });
// });


export { posts };
