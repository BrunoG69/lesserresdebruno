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
    await loadHeader();
    initNavbarScroll();

    loadFooter();
    loadConfig();
    initSmoothScroll();
    initContactForm();
});

/* ==================================================
   Formulaire de contact (EmailJS)
================================================== */
function initContactForm() {
    const form = document.getElementById("contactForm");
    if (!form) return;

    emailjs.init("0n3jTYOUjm2CCdwqR");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const status = document.getElementById("formStatus");
        const submitBtn = document.getElementById("submitBtn");

        submitBtn.disabled = true;
        submitBtn.textContent = "Envoi en cours...";

        emailjs.sendForm("service_cmvwjlr", "template_otg8qwc", form)
            .then(() => {
                status.innerHTML = `<p class="text-success">Message envoyé avec succès !</p>`;
                form.reset();
            })
            .catch((error) => {
                status.innerHTML = `<p class="text-danger">Une erreur est survenue, réessayez.</p>`;
                console.error("Erreur EmailJS :", error);
            })
            .finally(() => {
                submitBtn.disabled = false;
                submitBtn.textContent = "Envoyer";
            });
    });
}