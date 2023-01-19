import './css/styles.css';
import { fetchCountries } from './fetchCountries.js'
import { createCountryInfo } from './templetes/country-info';
import {createCountryList} from './templetes/country-list.js'
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector('input#search-box');
const countriesListEl = document.querySelector('.country-list')
const countryContainerEl = document.querySelector('.country-info')

function clearListAndContainer() {
  countriesListEl.innerHTML = '';
  countryContainerEl.innerHTML = '';
}

function onInputCountryName(e) {
  const query = e.target.value.trim();

  if (query === '') {
    clearListAndContainer();
    return
  }

  fetchCountries(query)
    .then(data => {
      if (data.length > 10) {
        Notify.info("Too many matches found. Please enter a more specific name.")
        clearListAndContainer();

      } else if (data.length >= 2 && data.length<=10){
        countriesListEl.innerHTML = createCountryList(data);
        countryContainerEl.innerHTML = '';

      } else {
        countriesListEl.innerHTML = '';
        countryContainerEl.innerHTML = createCountryInfo(data)
      }
    console.log(data);
  })
    .catch(err => {
    if (err.message === '404') {
      Notify.failure('Oops, there is no country with that name')
      clearListAndContainer();
    }
    console.log(err);
  })
}

inputEl.addEventListener('input', debounce(onInputCountryName, DEBOUNCE_DELAY))