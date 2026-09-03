async function loadComponent(elementId, htmlPath, jsPath, cssPath) {

    // Load HTML
    const response = await fetch(htmlPath);
    const html = await response.text();
    document.getElementById(elementId).innerHTML = html;

    //Load CSS
    if (cssPath) {
        const cssLink = document.createElement("link");
        cssLink.rel = "stylesheet";
        cssLink.href = cssPath;
        document.head.appendChild(cssLink);
    }


    // Load component JavaScript
    if (jsPath) {
        await import(jsPath);
    }

}


async function loadPage() {

    await loadComponent(
        "navbar",
        "./pages/homepage/navbar.html",
        "./navbar.js",
        "./css/homepage/navbar.css"
    );


    await loadComponent(
        "hero",
        "./pages/homepage/hero.html",
        null,
        "./css/homepage/hero.css"
    );


    await loadComponent(
        "featured",
        "./pages/homepage/featured.html",
        "./featured.js",
        "./css/homepage/featured.css"
    );

    await loadComponent(
        "excellence",
        "./pages/homepage/excellence.html",
        null,
        "./css/homepage/excellence.css"
    )

    await loadComponent(
        "aurum",
        "./pages/homepage/aurum.html",
        null,
        "./css/homepage/aurum.css"
    )

    await loadComponent(
        "performance",
        "./pages/homepage/performance.html",
        null,
        "./css/homepage/performance.css"
    )
}


loadPage();