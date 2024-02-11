import iziToast from 'izitoast';
import { searchImages } from 'pixabay-api';
import { hideLoader } from './render-functions';
import { refs } from './render-functions';
import { showLightBox } from './render-functions';

export function fetchData() {
  const searchedItem = refs.inputEl.value.trim();
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

        refs.listEl.insertAdjacentHTML('beforeend', markup);
        showLightBox();
      }
    })
    .catch(error => {
      console.log(error);
    })
    .finally(() => {
      hideLoader();
    });
}
