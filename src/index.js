import './css/styles.css';
import { fetchCountries } from './fetchCountries.js'
import { createCountryInfo } from './templetes/country-info';
import {createCountryList} from './templetes/country-list.js'
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;



// console.log(fetchCountries("Ukraine"));

const inputEl = document.querySelector('input#search-box');
const countriesListEl = document.querySelector('.country-list')
const countryContainerEl = document.querySelector('.country-info')

function onInputCountryName(e) {

  const query = e.target.value.trim()
  console.log(query);
  // countriesListEl.innerHTML = '';
  // countryContainerEl.innerHTML = '';

  if (e.target.value === '') {
    return
  }

  fetchCountries(query)
    .then(data => {
    
      if (data.length > 10) {
        Notify.info("Too many matches found. Please enter a more specific name.")
        countriesListEl.innerHTML = '';
        countryContainerEl.innerHTML = '';
      } else if (data.length > 2 && data.length<10){
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
    }
    console.log(err);
  })
  
  
  
}

inputEl.addEventListener('input', debounce(onInputCountryName, DEBOUNCE_DELAY))