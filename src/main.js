import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';
import { searchImages } from 'pixabay-api';

import 'izitoast/dist/css/iziToast.min.css';
import 'simplelightbox/dist/simple-lightbox.min.css';

const formEl = document.querySelector('form');
const btnEl = document.querySelector('button');
const inputEl = document.querySelector('input');
const listEl = document.querySelector('ul');

formEl.addEventListener('submit', evt => {
  evt.preventDefault();
  listEl.innerHTML = '';
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
            return `<li class="list-item"><a href="${data.webformatURL}">
          <img class="item-img" src="${data.webformatURL}" alt="${data.tags}" width="360" height="200"></a><p><b>Likes: </b>${data.likes}</p><p><b>Views: </b>${data.views}</p><p><b>Comments: </b>${data.comments}</p><p><b>Downloads: </b>${data.downloads}</p>
          </li>`;
          })
          .join('');

        listEl.insertAdjacentHTML('beforeend', markup);

        const lightbox = new SimpleLightbox('.gallery a', {
          captions: true,
          captionSelector: 'img',
          captionPosition: 'bottom',
        });
        lightbox.on('show.simplelightbox');
        lightbox.refresh();
      }
    })
    .catch(error => {
      console.log(error);
    });
});
