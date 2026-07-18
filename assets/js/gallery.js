const images =
document.querySelectorAll("[data-lightbox]");


const lightbox =
document.getElementById("lightbox");


const lightboxImg =
document.getElementById("lightbox-img");



images.forEach(image => {


    image.addEventListener("click", function(e){


        e.preventDefault();


        lightbox.style.display="flex";


        lightboxImg.src =
        this.href;


    });


});




document
.querySelector(".close-lightbox")
.addEventListener("click",()=>{


    lightbox.style.display="none";


});




lightbox.addEventListener("click",function(e){


    if(e.target===this){

        this.style.display="none";

    }


});