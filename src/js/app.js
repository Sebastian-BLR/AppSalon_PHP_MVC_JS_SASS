let paso = 1;
document.addEventListener('DOMContentLoaded', function(){
    iniciarApp();
});

function iniciarApp(){
    mostrarSeccion();
    tabs(); //Cambia la Seccion cuando se precionen los tabs
    
}

function mostrarSeccion(){
    // ocualtar la seccion que tenga la clase de mostrar
    const seccionAnterior = document.querySelector('.mostrar');
    if (seccionAnterior)
    seccionAnterior.classList.remove('mostrar');

    // Seleccionar la seccion con el paso...
    const seccion = document.querySelector(`#paso-${paso}`);
    seccion.classList.add('mostrar');
    
    // Quitar la clase actual al anterior :D
    const tabAnterior = document.querySelector('.actual');
    if(tabAnterior)
    tabAnterior.classList.remove('actual');
    // resalta el tab actual
    const tab = document.querySelector(`[data-paso = "${paso}"]`);
    tab.classList.add('actual');

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

