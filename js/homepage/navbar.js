const navItems = document.querySelectorAll(".nav-options li");
const menuIcon = document.getElementById("menuIcon");
const navOptions = document.querySelector(".nav-options");

navItems.forEach((item) => {
    item.addEventListener("click", () => {

        navItems.forEach((nav) => {
            nav.classList.remove("active");
        });

        item.classList.add("active");

        navOptions.classList.remove("show");
    });
});

menuIcon.addEventListener("click", (event) => {
    event.stopPropagation();

    navOptions.classList.toggle("show");
});

document.addEventListener("click", (event) => {

    if (
        !navOptions.contains(event.target) &&
        !menuIcon.contains(event.target)
    ) {
        navOptions.classList.remove("show");
    }

});