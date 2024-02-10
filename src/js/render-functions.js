import SimpleLightbox from 'simplelightbox';

export const refs = {
  formEl: document.querySelector('form'),
  inputEl: document.querySelector('input'),
  listEl: document.querySelector('ul'),
  loaderEl: document.querySelector('.loader'),
};

export function showLoader() {
  refs.loaderEl.style.display = 'flex';
}
export function hideLoader() {
  refs.loaderEl.style.display = 'none';
}

export function showLightBox() {
  const lightbox = new SimpleLightbox('.gallery a', {
    captions: true,
    captionSelector: 'img',
    captionPosition: 'bottom',
    captionsData: 'alt',
  });
  lightbox.on('show.simplelightbox');
  lightbox.refresh();
}
