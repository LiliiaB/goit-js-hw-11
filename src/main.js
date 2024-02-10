import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';
import { searchImages } from 'pixabay-api';

import 'izitoast/dist/css/iziToast.min.css';
import 'simplelightbox/dist/simple-lightbox.min.css';

const formEl = document.querySelector('form');
const btnEl = document.querySelector('button');
const inputEl = document.querySelector('input');
const listEl = document.querySelector('ul');
const loaderEl = document.querySelector('.loader');

function showLoader() {
  loaderEl.style.display = 'flex';
}
function hideLoader() {
  loaderEl.style.display = 'none';
}

formEl.addEventListener('submit', evt => {
  evt.preventDefault();
  listEl.innerHTML = '';
  showLoader();
  const searchedItem = inputEl.value;

  const API_KEY = '42152818-0d69fd49112a74751654c42bc';

  fetch(
    `https://pixabay.com/api/?key=${API_KEY}&q=${searchedItem}&image_type=photo&orientation=horizontal&safesearch=true`
  )
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => {
      if (data.hits.length === 0) {
        iziToast.error({
          position: 'bottomCenter',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
        });
      } else {
        const markup = data.hits
          .map(data => {
            return `<li class="list-item"><a href="${data.largeImageURL}">
          <img class="item-img" src="${data.webformatURL}" alt="${data.tags}" ></a><div class="container"><p><b>Likes: </b><br>${data.likes}</p><p><b>Views: </b><br>${data.views}</p><p><b>Comments: </b><br>${data.comments}</p><p><b>Downloads: </b><br>${data.downloads}</p>
          </li></div>`;
          })
          .join('');

        listEl.insertAdjacentHTML('beforeend', markup);

        const lightbox = new SimpleLightbox('.gallery a', {
          captions: true,
          captionSelector: 'img',
          captionPosition: 'bottom',
          captionsData: 'alt',
        });
        lightbox.on('show.simplelightbox');
        lightbox.refresh();
        hideLoader();
      }
    })
    .catch(error => {
      console.log(error);
    });
});
