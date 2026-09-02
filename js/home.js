console.log("HOME JS IS RUNNING");

import products from "./data/products.js";
// import "../css/home.css"

const navItems = document.querySelectorAll(".nav-options li");

navItems.forEach((item) => {

    item.addEventListener("click", () => {
        navItems.forEach((nav) => {
            nav.classList.remove("active");
        });
        item.classList.add("active");

    });

});

console.log("PRODUCTS:", products);

const cardCollection = document.querySelector(".featured-cards");

console.log("CARD COLLECTION:", cardCollection);

const featuredProducts = products.slice(0, 4);
featuredProducts.forEach((product) => {

    const card = document.createElement("div");
    card.classList.add("product-card");

    const name = document.createElement("h3");
    name.textContent = product.name;

    const price = document.createElement("p");
    price.textContent = `$${product.price}`;

    card.append(name, price);
    

    cardCollection.append(card);
});