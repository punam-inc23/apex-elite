console.log("HOME JS IS RUNNING");

import products from "../data/products.js"

const cardCollection = document.querySelector(".products-all");

console.log("CARD COLLECTION:", cardCollection);

products.forEach((product) => {

    const card = document.createElement("div");
    card.classList.add("product-card");

    card.addEventListener("click", () => {

        const url = `../product/product.html?id=${product.id}`;

        console.log("Opening:", url);

        window.location.href = url;

    });

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
    rateImg.src = "/apex-elite/assets/icons/rate.png"

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