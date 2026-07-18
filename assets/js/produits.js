async function chargerProduits(){


    const zone =
    document.getElementById("liste-produits");


    try{


        const response =
        await fetch("data/produits.json");


        const produits =
        await response.json();



        produits.forEach(produit => {


            zone.innerHTML += `

            <div class="col-md-4"
            data-aos="fade-up">


                <div class="card-product">


                    <img src="assets/images/produits/${produit.image}"
                    class="img-fluid rounded mb-3"
                    alt="${produit.titre}">


                    <i class="${produit.icone}"></i>


                    <h3>
                    ${produit.titre}
                    </h3>


                    <p>
                    ${produit.description}
                    </p>


                </div>


            </div>

            `;


        });



    }
    catch(error){

        console.error(
            "Erreur chargement produits",
            error
        );

    }


}



chargerProduits();