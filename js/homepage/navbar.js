const navItems = document.querySelectorAll(".nav-options li");

navItems.forEach((item) => {

    item.addEventListener("click", () => {
        navItems.forEach((nav) => {
            nav.classList.remove("active");
        });
        item.classList.add("active");

    });

});