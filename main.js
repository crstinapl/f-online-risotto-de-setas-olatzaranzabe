'use strict';

const itemsList = document.querySelector('.ingredients__list');
const title = document.querySelector('.title');
// console.log(itemList);
const url = 'https://raw.githubusercontent.com/Adalab/recipes-data/master/rissoto-setas.json';

let name;
let ingredients;


function fetchRecipe() {
    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (myJson) {
            console.log(myJson);
            console.log(myJson.recipe.name)
            name = myJson.recipe.name;
            ingredients = myJson.recipe.ingredients;

            writeTitle();
            writeIngredients();
        });
}

console.log(ingredients)

window.onload = fetchRecipe;

function writeTitle() {
    title.innerHTML = name;
}

function writeIngredients() {
    itemsList.innerHTML = ingredients.map((ingredient, i)=>{
        return `
        <li>
            <input type="checkbox" data-index=${i} id="item${i}" />
            <label for="item${i}">${ingredient.product}</label>
        </li>
        `;
    })
}
