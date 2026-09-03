console.log("HOME JS IS RUNNING");

import products from "../data/products.js"
// import "../css/home.css"

console.log("PRODUCTS:", products);

const cardCollection = document.querySelector(".featured-cards");

console.log("CARD COLLECTION:", cardCollection);

const featuredProducts = products.slice(0, 3);
featuredProducts.forEach((product) => {

    const card = document.createElement("div");
    card.classList.add("product-card");

    card.addEventListener("click", () => {

        const url = `./pages/product/product.html?id=${product.id}`;

        console.log("Opening:", url);

        window.location.href = url;

    });

    if (product.id === 1) {
        const badge = document.createElement("span");

        badge.classList.add("product-badge", "new-arrival");
        badge.textContent = "NEW ARRIVAL";

        card.append(badge);
    }

    if (product.id === 2) {
        const badge = document.createElement("span");

        badge.classList.add("product-badge", "limited-edition");
        badge.textContent = "LIMITED EDITION";

        card.append(badge);
    }

    const imgCard = document.createElement("img");
    imgCard.src = product.image;

    const cardData = document.createElement("div");
    cardData.classList.add("product-data");

    const productData = document.createElement("div");
    productData.classList.add("product-name");

    const name = document.createElement("h3");
    name.textContent = product.name;

    const price = document.createElement("p");
    price.textContent = `$${product.price}`;

    productData.append(name, price)

    const ratingDiv = document.createElement("div");
    ratingDiv.classList.add("rating-div")

    const rateImg = document.createElement("img");
    rateImg.src = "assets/icons/rate.png"

    const rating = document.createElement("p");
    rating.textContent = product.ratings;

    const reviews = document.createElement("p");
    reviews.textContent = `(${product.reviews} reviews)`

    const colorDiv = document.createElement("div");
    colorDiv.classList.add("color-div");
    product.colors.forEach((color) => {

        const colorCircle = document.createElement("span");

        colorCircle.classList.add("color-circle");

        colorCircle.style.backgroundColor = color;

        colorDiv.append(colorCircle);
    });

    const addButton = document.createElement("button");
    addButton.classList.add("add-button")
    addButton.textContent = "ADD TO BAG"

    ratingDiv.append(rateImg, rating, reviews)

    cardData.append(productData, ratingDiv, colorDiv, addButton)

    card.append(imgCard, cardData);

    cardCollection.append(card);
});