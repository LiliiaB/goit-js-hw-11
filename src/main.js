import { showLoader } from './js/render-functions';
import { refs } from './js/render-functions';
import { fetchData } from './js/pixabay-api';
import { searchImages } from 'pixabay-api';

import 'izitoast/dist/css/iziToast.min.css';
import 'simplelightbox/dist/simple-lightbox.min.css';

refs.formEl.addEventListener('submit', evt => {
  evt.preventDefault();
  refs.listEl.innerHTML = '';
  showLoader();
  fetchData();
});
