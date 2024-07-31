// Точка входа

import './fullsize-img.js';
import { similarImages } from './create-photos.js';
import { renderThumbnail } from './thumbnail-img.js';
import './create-comment.js';
import './upload-files.js';
import { hideModal, setUserFormSubmit } from './form.js';
import './effects.js';
import './api.js';

renderThumbnail(similarImages);
setUserFormSubmit(hideModal);
