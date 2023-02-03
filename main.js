const searchForm = document.querySelector('form');
const searchResultDiv = document.querySelector('.search-result');
const container = document.querySelector('.container');
let searchQuery = '';
const APP_ID = '3ece9358';
const APP_KEY = '6c818844d1e6a3a6713a44ed1dac95eb';

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    fetchAPI();
});

async function fetchAPI() {
    searchQuery = document.querySelector('input').value;
    const baseURL = `https://api.edamam.com/api/recipes/v2?type=public&q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_KEY}&to=20`;
    const response = await fetch(baseURL);
    const data = await response.json();
    generateHTML(data.hits);

    console.log(data.hits);
}

function generateHTML(results) {
    let generatedHTML = '';

    results.map(result => {
        generatedHTML += 
        `
        <div class="item">
        <img src="${result.recipe.image}">
        <div class="flex-container">
          <h1 class="title">${result.recipe.label}</h1>
          <a class="view-btn" href="${result.recipe.url}" target="_blank" >View Recipe</a>
        </div>
        <p class="item-data">${result.recipe.calories.toFixed(0)} calories </p>
      </div>
        `
    });

    searchResultDiv.innerHTML = generatedHTML;
}
