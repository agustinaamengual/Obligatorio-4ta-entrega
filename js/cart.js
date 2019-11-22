let productUnitCost = 0;
let productCurrency = "";
let subtotal = 0;
let shippingPercentage = 0.15;
let total = 0;
let paymentTypeSelected = false;
const CREDIT_CARD_PAYMENT = "Tarjeta de crédito";
const BANKING_PAYMENT = "Transferencia bancaria";
let ERROR_MSG = "Ha habido un error, verifica qué pasó.";
let DOLLAR_SYMBOL = "USD";
let PESO_SYMBOL = "UYU ";
var articles = [];

function updateTotalCosts(){
    let unitProductCostHTML = document.getElementById("productCostText");
    let comissionCostHTML = document.getElementById("comissionText");
    let totalCostHTML = document.getElementById("totalCostText");

    let comissionToShow = Math.round((shippingPercentage * subtotal) / 100) + PERCENTAGE_SYMBOL;
    let totalCostToShow = MONEY_SYMBOL + (Math.round(subtotal * shippingPercentage) / 100) + subtotal;

    unitProductCostHTML.innerHTML = subtotal;
    comissionCostHTML.innerHTML = comissionToShow;
    totalCostHTML.innerHTML = totalCostToShow;
}

function updateSubtotal() {
    let count = parseInt(document.getElementById("cantidad").value);
    subtotal = count * productUnitCost;
    document.getElementById("subtotal").innerHTML = MONEY_SYMBOL + " " + subtotal;
    updateTotalCost()

}

function showPaymentTypeNotSelected(){

}

function hidePaymentTypeNotSelected(){

}

function showProducts(array) {
    let htmlContentToAppend = "";
    for (let i = 0; i < array.length; i++) {
        let product = array[i];
        productUnitCost = product.unitCost;
  
        htmlContentToAppend += `
        <td><img src="` + product.src + `"></td>
        <td>` + product.name + `</td>
        <td>` + product.unitCost + `</td>
        <td>` + PESO_SYMBOL + `</td>
        
        <td> <input type="number" value= "1" min= "0" id= "cantidad" onchange="updateSubtotal();" ></td>
        <td id="subtotal"></td>
        
        `
    }
    document.getElementById("inner").innerHTML = htmlContentToAppend;
    updateSubtotal();


}


document.addEventListener("DOMContentLoaded", function(e) {
    getJSONData(CART_INFO_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {

            productCurrency =(resultObj.data.articles);
            showProducts(resultObj.data.articles);
        }
    })
});


document.getElementById("goldradio").addEventListener("change", function(){
    shippingPercentage = 0.15;
    updateTotalCosts();
});

document.getElementById("premiumradio").addEventListener("change", function(){
    shippingPercentage = 0.07;
    updateTotalCosts();
});

document.getElementById("standardradio").addEventListener("change", function(){
    shippingPercentage = 0.05;
    updateTotalCosts();
});