
// const templateList = `
//   <li>
//     <img src="" alt="">
//     <p></p>
//   </li>
//   `;

export function createCountryList(arrOfCountries) {
  const countryItemArr = arrOfCountries.map(el => {
    return `
      <li class = "country-item">
        <img class="country-item__thumb-flag" src="${el.flags.svg}" alt="Flag of ${el.name.official}">
        <span class="country-item__name">${el.name.common}</span>
      </li>
      `
  }).join('')

  console.log(countryItemArr);
  return countryItemArr
}