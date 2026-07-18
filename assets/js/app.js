/* ==================================================
   LES SERRES DE BRUNO
   Javascript principal
================================================== */


/**
 * Gestion de la navbar au scroll
 *
 * Index :
 * - transparente en haut
 * - verte après scroll
 *
 * Pages internes :
 * - toujours verte
 */

document.addEventListener("DOMContentLoaded", function () {


    const navbar = document.querySelector(".navbar");
    console.log(navbar.className);

    if(!navbar) return;



    // Gestion uniquement de l'accueil

    if(!navbar.classList.contains("navbar-fixed-green")){


        function checkNavbar(){


            if(window.scrollY > 50){


                navbar.classList.add("scrolled");


            }
            else {


                navbar.classList.remove("scrolled");


            }


        }



        // Vérification au chargement

        checkNavbar();



        // Vérification au scroll

        window.addEventListener(
            "scroll",
            checkNavbar
        );


    }


});







/**
 * Animation smooth scroll
 */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {


    anchor.addEventListener("click", function(e){


        const target =
        document.querySelector(
            this.getAttribute("href")
        );


        if(target){


            e.preventDefault();


            target.scrollIntoView({

                behavior:"smooth"

            });


        }


    });


});







/**
 * Chargement configuration entreprise
 * depuis data/config.json
 */

async function loadConfig(){


    try {


        const response =
        await fetch("data/config.json");


        const config =
        await response.json();



        document
        .querySelectorAll("[data-company]")
        .forEach(element => {


            const key =
            element.dataset.company;



            if(config[key]){


                element.textContent =
                config[key];


            }


        });


    }
    catch(error){


        console.log(
            "Configuration non chargée",
            error
        );


    }


}



loadConfig();