'use strict';

const itemsList = document.querySelector('.ingredients__list');
const title = document.querySelector('.title');
// console.log(itemList);
const url = 'https://raw.githubusercontent.com/Adalab/recipes-data/master/rissoto-setas.json';
const selectButton = document.querySelector('.select__button');
const noSelectButton = document.querySelector('.noselect__button');
const shippingCost = document.querySelector('.pay__shipment');

let name;
let ingredients;
let currency;
let shipping;

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
            currency = myJson.recipe.currency;
            shipping = myJson.recipe['shipping-cost'];
            writeTitle();
            writeIngredients();
            console.log(shipping)
            payment();
        });
}

console.log(ingredients)

window.onload = fetchRecipe;

function writeTitle() {
    title.innerHTML = name;
}

function writeIngredients() {
    itemsList.innerHTML = ingredients.map((ingredient, i) => {
        return `
        <li class="inbox">
            <input type="checkbox" data-index=${i} id="item${i}" name="box" />
            <input type="number" min="0" value="${ingredient.items}" />
            <div>
                <label for="item${i}">${ingredient.product}</label>
                <p>${ingredient.brand}</p>
                <p>${ingredient.quantity}</p>
            </div>
            <div class="ingredient__prices">
                <p>${ingredient.price}</p>
                <p>${currency}</p>
            </div>
        </li>
        `;
    }).join('');
}

function selectAll(e) {
    console.log('todo selecionado')
    const checkboxes = document.getElementsByName('box');
    // for (var i = 0, n = checkboxes.length; i < n; i++) {
    //     checkboxes[i].checked = e.checked;
    // }
    // if (e.checked) {
    for (var i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = true;
    }
    // } else {
    //     for (var i = 0; i < checkboxes.length; i++) {
    //         checkboxes[i].checked = false;
    //     }
    // }
}

function noSelectAll() {
    console.log('nada selecionado')
    const checkboxes = document.getElementsByName('box');
    for (var i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = false;
    }
}

function payment() {
    shippingCost.innerHTML = shipping;
}

selectButton.addEventListener('click', selectAll);
noSelectButton.addEventListener('click', noSelectAll);