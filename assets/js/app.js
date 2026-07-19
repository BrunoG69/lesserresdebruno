/* ==================================================
   LES SERRES DE BRUNO
   Javascript principal
================================================== */

/* ==================================================
   Chargement du Header
================================================== */
async function loadHeader() {
    const header = document.getElementById("header");
    if (!header) return;

    try {
        const response = await fetch("includes/header.html");
        if (!response.ok) throw new Error(`Erreur ${response.status}`);
        header.innerHTML = await response.text();
    } catch (error) {
        console.error("Header non chargé :", error);
    }
}

/* ==================================================
   Chargement du Footer
================================================== */
async function loadFooter() {
    const footer = document.getElementById("footer");
    if (!footer) return;

    try {
        const response = await fetch("includes/footer.html");
        if (!response.ok) throw new Error(`Erreur ${response.status}`);
        footer.innerHTML = await response.text();
    } catch (error) {
        console.error("Footer non chargé :", error);
    }
}

/* ==================================================
   Gestion de la navbar au scroll
   - Index : transparente en haut, verte après scroll
   - Pages internes : toujours verte (navbar-fixed-green)
================================================== */
function initNavbarScroll() {
    const navbar = document.querySelector(".navbar");
    if (!navbar) return;

    // Pages internes : rien à faire, la navbar reste verte via CSS
    if (navbar.classList.contains("navbar-fixed-green")) return;

    function checkNavbar() {
        navbar.classList.toggle("scrolled", window.scrollY > 50);
    }

    checkNavbar();
    window.addEventListener("scroll", checkNavbar);
}

/* ==================================================
   Animation smooth scroll (ancres internes)
================================================== */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            const targetId = this.getAttribute("href");
            if (targetId === "#") return;

            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: "smooth" });
            }
        });
    });
}

/* ==================================================
   Chargement configuration entreprise
   depuis data/config.json
================================================== */
async function loadConfig() {
    try {
        const response = await fetch("data/config.json");
        if (!response.ok) throw new Error(`Erreur ${response.status}`);
        const config = await response.json();

        document.querySelectorAll("[data-company]").forEach(element => {
            const key = element.dataset.company;
            if (config[key]) {
                element.textContent = config[key];
            }
        });
    } catch (error) {
        console.log("Configuration non chargée :", error);
    }
}

/* ==================================================
   Initialisation générale
================================================== */
document.addEventListener("DOMContentLoaded", async () => {
    // On attend que le header soit injecté avant d'initialiser la navbar
    await loadHeader();
    initNavbarScroll();

    loadFooter();
    loadConfig();
    initSmoothScroll();
});