var faker = require("faker");

function printProducts() {
    for (var i = 0; i < 10; i++) {
        console.log(`${faker.commerce.productName()} - $${faker.commerce.price()}`);
    }
}

console.log("=======================");
console.log("WELCOME TO MY SHOP!");
console.log("=======================");
printProducts();