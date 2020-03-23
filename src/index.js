import './styles.css';
import fetchCountries from './fetchCountries.js';
import debounce from 'lodash.debounce';
import countryListTemplate from './template/country-list.hbs';
import countryInfoTemplate from './template/country.hbs';
import PNotify from 'pnotify/dist/es/PNotify.js';

const refs = {
  searchInput: document.querySelector('.js-input'),
  countryUl: document.querySelector('.js-list'),
  countryContainer: document.querySelector('.js-country'),
};

refs.searchInput.addEventListener('input', debounce(inputCountryName, 800));

function inputCountryName(e) {
  e.preventDefault();
  const searchInputValue = e.target.value;

  if (searchInputValue === '') {
    refs.countryUl.innerHTML = '';
    refs.countryContainer.innerHTML = '';
    return;
  }

  fetchCountries(searchInputValue).then(data => {
    renderCountryList(data);
  });
}
function renderCountryList(arr) {
  if (arr.length === 1) {
    refs.countryUl.innerHTML = '';
    const markUpCountryInfo = countryInfoTemplate(arr);
    refs.countryContainer.insertAdjacentHTML('beforeend', markUpCountryInfo);
  } else if (arr.length >= 2 && arr.length <= 10) {
    refs.countryContainer.innerHTML = '';
    const markUpList = countryListTemplate(arr);
    refs.countryUl.insertAdjacentHTML('beforeend', markUpList);
  } else if (arr.length > 10) {
    PNotify.alert(
      'Too many matches found. Please enter a more specific query!',
    );
  }
}
