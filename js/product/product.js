import products from "../data/products.js";

const navItems = document.querySelectorAll(".nav-options li");

navItems.forEach((item) => {

    item.addEventListener("click", () => {
        navItems.forEach((nav) => {
            nav.classList.remove("active");
        });
        item.classList.add("active");

    });

});
 
const params = new URLSearchParams(
    window.location.search
);

const productId = Number(
    params.get("id")
);

const product = products.find(
    (item) => item.id === productId
);

if (!product) {

    document.body.innerHTML = `
        <h1>Product Not Found</h1>

        <a href="../viewall/viewall.html">
            Back to Products
        </a>
    `;

} else {

    displayProduct(product);

}


function displayProduct(product) {

    const image = document.querySelector("#product-image");
    const name = document.querySelector("#product-name");
    const price = document.querySelector("#product-price");
    const description = document.querySelector("#product-description");
    image.src = `../../${product.image}`;
    image.alt = product.name;
    name.textContent = product.name;
    price.textContent = `$${product.price}.00`;
    description.textContent = product.description;
    displaySizes(product.sizes);
}

function displaySizes(sizes) {

    const sizeContainer =
        document.querySelector("#product-sizes");


    sizes.forEach((size) => {

        const sizeButton =
            document.createElement("button");

        sizeButton.textContent = size;

        sizeButton.classList.add(
            "size-button"
        );


        sizeButton.addEventListener(
            "click",
            () => {

                document
                    .querySelectorAll(".size-button")
                    .forEach((button) => {

                        button.classList.remove(
                            "selected"
                        );

                    });


                sizeButton.classList.add(
                    "selected"
                );

            }
        );


        sizeContainer.append(sizeButton);

    });
}