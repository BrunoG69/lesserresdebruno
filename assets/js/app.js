/* ==================================================
   LES SERRES DE BRUNO
   Javascript principal
================================================== */


/**
 * Gestion de la navbar au scroll
 */

document.addEventListener("DOMContentLoaded", function () {


    const navbar = document.querySelector(".navbar");


    if(navbar){


        window.addEventListener("scroll", function(){


            if(window.scrollY > 80){

                navbar.classList.add("scrolled");

            } else {

                navbar.classList.remove("scrolled");

            }


        });


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
 * Chargement de la configuration entreprise
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