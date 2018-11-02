'use strict';

const itemsList = document.querySelector('.ingredients__list');
const title = document.querySelector('.title');
// console.log(itemList);
const url = 'https://raw.githubusercontent.com/Adalab/recipes-data/master/rissoto-setas.json';
const selectButton = document.querySelector('.select__button');
const noSelectButton = document.querySelector('.noselect__button');
const subtotal = document.querySelector('.pay__subtotal');
const shippingCost = document.querySelector('.pay__shipment');
const totalCost = document.querySelector('.pay__quantity');

let name;
let ingredients;
let currency;
let shipping;
let totalPrice = 0;

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
            selectCheckbox();
            totalPayment();
        });
}

window.onload = fetchRecipe;

function writeTitle() {
    title.innerHTML = name;
}

function writeIngredients() {
    itemsList.innerHTML = ingredients.map((ingredient, i) => {
        return `
        <li class="inbox">
            <input class="checkbox__input" type="checkbox" id="item${i}" name="box" value=${ingredient.price.toFixed(2)} />
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

function selectCheckbox() {
    let checkboxesList = document.querySelectorAll('.checkbox__input');
    checkboxesList.forEach((checkboxes)=>{
        return checkboxes.addEventListener('click', totalPayment);
    })
}

function selectAll() {
    const checkboxes = document.getElementsByName('box');
    for (var i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = true;
    }
}

function noSelectAll() {
    const checkboxes = document.getElementsByName('box');
    for (var i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = false;
    }
}

function totalPayment(e) {
    console.log(e.target)
    const money = e.target.value;
    console.log(money)
    totalPrice += parseFloat(money);
    console.log(totalPrice)
    subtotal.innerHTML = `Subtotal: ${totalPrice}`;
    shippingCost.innerHTML ='Gastos de envio: ' + parseFloat(shipping).toFixed(2) + currency;
    totalCost.innerHTML = 'Total: ' + (totalPrice) + parseFloat(shipping).toFixed(2) + currency
    console.log(shipping)
}

selectButton.addEventListener('click', selectAll);
noSelectButton.addEventListener('click', noSelectAll);