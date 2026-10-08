import products from "../data/products.js";

function getCart() {

    const cart =
        JSON.parse(localStorage.getItem("apexCart")) || [];

    return cart;
}


function saveCart(cart) {

    localStorage.setItem(
        "apexCart",
        JSON.stringify(cart)
    );

}

export function addToCart(productId) {

    const cart = getCart();

    const existingItem =
        cart.find(item => item.id === productId);


    if (existingItem) {

        existingItem.quantity += 1;

    } else {

        cart.push({
            id: productId,
            quantity: 1
        });

    }


    saveCart(cart);

    updateCartCount();

}

export function updateCartCount() {

    const cart = getCart();

    const totalQuantity =
        cart.reduce(
            (total, item) => total + item.quantity,
            0
        );


    const cartCount =
        document.querySelector("#cart-count");


    if (cartCount) {

        cartCount.textContent =
            totalQuantity;

    }

}

function renderCart() {

    const cartContainer =
        document.querySelector("#cart-items");


    // If we're not on cart page
    if (!cartContainer) {
        return;
    }


    const cart = getCart();


    cartContainer.innerHTML = "";


    if (cart.length === 0) {

        renderEmptyCart();

        updateSummary();

        return;

    }


    cart.forEach(cartItem => {

        const product =
            products.find(
                item => item.id === cartItem.id
            );


        if (!product) {
            return;
        }


        createCartItem(
            product,
            cartItem.quantity
        );

    });


    updateSummary();

}

function createCartItem(
    product,
    quantity
) {

    const cartContainer =
        document.querySelector("#cart-items");


    const card =
        document.createElement("div");

    card.classList.add("cart-item");

    const image =
        document.createElement("img");

    image.classList.add(
        "cart-item-image"
    );

    image.src =
        `../../${product.image}`;

    image.alt =
        product.name;

    const details =
        document.createElement("div");

    details.classList.add(
        "cart-item-details"
    );

    const top =
        document.createElement("div");

    top.classList.add(
        "cart-item-top"
    );


    const nameContainer =
        document.createElement("div");


    const name =
        document.createElement("h3");

    name.classList.add(
        "cart-item-name"
    );

    name.textContent =
        product.name;


    const meta =
        document.createElement("p");

    meta.classList.add(
        "cart-item-meta"
    );

    meta.textContent =
        `PRO TECH • ${product.colors[0]} / WHITE`;


    nameContainer.append(
        name,
        meta
    );


    const price =
        document.createElement("p");

    price.classList.add(
        "cart-item-price"
    );

    price.textContent =
        `$${product.price.toFixed(2)}`;


    top.append(
        nameContainer,
        price
    );

    const controls =
        document.createElement("div");

    controls.classList.add(
        "item-controls"
    );

    const sizeGroup =
        document.createElement("div");

    sizeGroup.classList.add(
        "control-group"
    );


    const sizeLabel =
        document.createElement("label");

    sizeLabel.textContent =
        "SIZE (US)";


    const size =
        document.createElement("span");

    size.classList.add(
        "size-value"
    );

    size.textContent =
        product.sizes[0];


    sizeGroup.append(
        sizeLabel,
        size
    );

    const quantityGroup =
        document.createElement("div");

    quantityGroup.classList.add(
        "control-group"
    );


    const quantityLabel =
        document.createElement("label");

    quantityLabel.textContent =
        "QUANTITY";


    const quantityControl =
        document.createElement("div");

    quantityControl.classList.add(
        "quantity-control"
    );


    const minus =
        document.createElement("button");

    minus.textContent = "−";


    const quantityText =
        document.createElement("span");

    quantityText.textContent =
        quantity;


    const plus =
        document.createElement("button");

    plus.textContent = "+";


    minus.addEventListener(
        "click",
        () => {

            changeQuantity(
                product.id,
                -1
            );

        }
    );


    plus.addEventListener(
        "click",
        () => {

            changeQuantity(
                product.id,
                1
            );

        }
    );


    quantityControl.append(
        minus,
        quantityText,
        plus
    );


    quantityGroup.append(
        quantityLabel,
        quantityControl
    );


    controls.append(
        sizeGroup,
        quantityGroup
    );


    const actions =
        document.createElement("div");

    actions.classList.add(
        "item-actions"
    );


    const removeButtonDiv =
        document.createElement("div");
    
    removeButtonDiv.classList.add("remove-button")

    const removeImg = document.createElement("img");
    removeImg.src = "../../assets/icons/delete.png"

    const removeName = document.createElement("p")
    removeName.textContent = "Remove"
    removeName.classList.add("remove-name")

    // removeButtonDiv.textContent =
    //     "▣ Remove";

    removeButtonDiv.append(removeImg, removeName)

    removeButtonDiv.addEventListener(
        "click",
        () => {

            removeFromCart(product.id);

        }
    );


    const saveButton =
        document.createElement("button");

    saveButton.textContent =
        "▰ Save for later";


    actions.append(
        removeButtonDiv,
        saveButton
    );


    details.append(
        top,
        controls,
        actions
    );


    card.append(
        image,
        details
    );


    cartContainer.append(card);

}

function changeQuantity(
    productId,
    change
) {

    const cart = getCart();


    const item =
        cart.find(
            item => item.id === productId
        );


    if (!item) {
        return;
    }


    item.quantity += change;


    if (item.quantity <= 0) {

        const newCart =
            cart.filter(
                item => item.id !== productId
            );

        saveCart(newCart);

    } else {

        saveCart(cart);

    }


    renderCart();

    updateCartCount();

}

function removeFromCart(productId) {

    const cart = getCart();


    const updatedCart =
        cart.filter(
            item => item.id !== productId
        );


    saveCart(updatedCart);


    renderCart();

    updateCartCount();

}

function renderEmptyCart() {

    const container =
        document.querySelector("#cart-items");


    const empty =
        document.createElement("div");

    empty.classList.add(
        "empty-cart"
    );


    empty.innerHTML = `
        <h2>Your bag is empty</h2>

        <p>
            Discover our elite collection
            and add something to your bag.
        </p>

        <button id="empty-cart-shopping">
            SHOP COLLECTION
        </button>
    `;


    container.append(empty);


    document
        .querySelector("#empty-cart-shopping")
        .addEventListener(
            "click",
            () => {

                window.location.href =
                    "../../index.html";

            }
        );

}

function updateSummary() {
    const cart = getCart();
    let subtotal = 0;
    cart.forEach(cartItem => {
        const product =
            products.find(
                item => item.id === cartItem.id
            );

        if (product) {

            subtotal +=
                product.price *
                cartItem.quantity;

        }

    });

    const TAX_RATE = 0.0824;


    const tax =
        subtotal * TAX_RATE;


    const grandTotal =
        subtotal + tax;


    const subtotalElement =
        document.querySelector("#subtotal");


    const taxElement =
        document.querySelector("#tax");


    const totalElement =
        document.querySelector("#grand-total");


    if (subtotalElement) {

        subtotalElement.textContent =
            `$${subtotal.toFixed(2)}`;

    }


    if (taxElement) {

        taxElement.textContent =
            `$${tax.toFixed(2)}`;

    }


    if (totalElement) {

        totalElement.textContent =
            `$${grandTotal.toFixed(2)}`;

    }


    updateItemCount();

}

function updateItemCount() {

    const cart = getCart();


    const totalQuantity =
        cart.reduce(
            (total, item) =>
                total + item.quantity,
            0
        );


    const element =
        document.querySelector(
            "#cart-item-count"
        );


    if (element) {

        element.textContent =
            `${totalQuantity} ${totalQuantity === 1
                ? "item"
                : "items"
            } in your bag`;

    }

}

function renderRecommendations() {

    const container =
        document.querySelector(
            "#recommendation-products"
        );


    if (!container) {
        return;
    }


    const recommendedProducts =
        products.slice(5, 9);


    recommendedProducts.forEach(
        product => {

            const card =
                document.createElement("div");

            card.classList.add(
                "recommendation-card"
            );


            const image =
                document.createElement("img");

            image.classList.add(
                "recommendation-image"
            );

            image.src =
                `../../${product.image}`;

            image.alt =
                product.name;


            const name =
                document.createElement("p");

            name.classList.add(
                "recommendation-name"
            );

            name.textContent =
                product.name;


            const price =
                document.createElement("p");

            price.classList.add(
                "recommendation-price"
            );

            price.textContent =
                `$${product.price}`;


            card.append(
                image,
                name,
                price
            );


            card.addEventListener(
                "click",
                () => {

                    window.location.href =
                        `../product/product.html?id=${product.id}`;

                }
            );


            container.append(card);

        }
    );

}


/* =================================
   CONTINUE SHOPPING
================================= */

const continueShopping =
    document.querySelector(
        "#continue-shopping"
    );


if (continueShopping) {

    continueShopping.addEventListener(
        "click",
        () => {

            window.location.href =
                "../../index.html";

        }
    );

}


/* =================================
   PROMO CODE
================================= */

const promoButton =
    document.querySelector(
        "#apply-promo"
    );


if (promoButton) {

    promoButton.addEventListener(
        "click",
        () => {

            const input =
                document.querySelector(
                    "#promo-code"
                );


            if (
                input.value.trim().toUpperCase()
                === "APEX10"
            ) {

                alert(
                    "Promo code applied!"
                );

            } else {

                alert(
                    "Invalid promo code"
                );

            }

        }
    );

}


/* =================================
   INITIALIZE
================================= */

updateCartCount();

renderCart();

renderRecommendations();