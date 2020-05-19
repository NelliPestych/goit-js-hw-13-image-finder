import menuItem from './template.hbs';
import './styles.css';

const menuItemPosition = document.querySelector('.js-menu');

let page = 1;

const refs = {
  searchForm: document.querySelector('.my-input'),
  LoadMore: document.querySelector('button[data-action="load-more"]'),
};

refs.searchForm.addEventListener('blur', searchFormSubmitHandler);

function searchFormSubmitHandler(e) {
  e.preventDefault();

  clearListItems();

  fetchArticles();
}

function clearListItems() {
  menuItemPosition.innerHTML = '';
  page = 1;
}

refs.LoadMore.addEventListener('click', loadMoreBtnHandler);

function loadMoreBtnHandler() {
  page += 1;
  fetchArticles();
  const i = document.body.scrollHeight;
  window.scrollTo({
    top: i,
    behavior: 'smooth',
  });
}

function fetchArticles() {
  const SearchQuery = refs.searchForm.value;
  fetch(
    'https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=' +
      SearchQuery +
      '&page=' +
      page +
      '&per_page=12&key=16588925-02413834d9828552035921ade',
  )
    .then(response => {
      return response.json();
    })
    .then(data => {
      const markup = data.hits.map(name => menuItem(name)).join('');
      menuItemPosition.insertAdjacentHTML('beforeend', markup);
    });
}
