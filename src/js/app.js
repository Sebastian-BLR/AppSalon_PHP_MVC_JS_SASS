let paso = 1;
document.addEventListener('DOMContentLoaded', function(){
    iniciarApp();
});

function iniciarApp(){
    tabs(); //Cambia la Seccion cuando se precionen los tabs
}

function mostrarSeccion(){
    
}
function tabs(){
    const botones = document.querySelectorAll('.tabs button');
    botones.forEach(boton => {
        boton.addEventListener('click', function(e){
            paso = parseInt(e.explicitOriginalTarget.dataset.paso);
            mostrarSeccion();
        });
    });
}

