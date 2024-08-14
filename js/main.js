// Точка входа

import { debounce } from './utils.js';
import './fullsize-img.js';
import { similarImages } from './create-photos.js';
import { renderThumbnail } from './thumbnail-img.js';
import './create-comment.js';
import './upload-files.js';
import { hideModal, setUserFormSubmit } from './form.js';
import './effects.js';
import { getData } from './api.js';
import { init, getFilteredPictures } from './filters.js';

renderThumbnail(similarImages);
setUserFormSubmit(hideModal);

try {
  const data = await getData();
  const debouncedRenderThumbnail = debounce(renderThumbnail);
  init(data, debouncedRenderThumbnail);
  renderThumbnail(getFilteredPictures());
} catch (err) {
  throw new Error(err);
}
