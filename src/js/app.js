let paso = 1;
const pasoInicial = 1;
const pasoFinal   = 3;
document.addEventListener('DOMContentLoaded', function(){
    iniciarApp();
});

function iniciarApp(){
    mostrarSeccion();
    tabs(); //Cambia la Seccion cuando se precionen los tabs
    botonesPaginador();// agreaga o quita los botones al paginador
    paginaAnterior();
    paginaSiguiente();
}

function paginaAnterior(){
    const paginaAnterior = document.querySelector('#anterior');
    paginaAnterior.addEventListener('click', function (){
        if(paso > pasoInicial)
        paso--;
        console.log(paso);
        mostrarSeccion();
        botonesPaginador();
    });
}

function paginaSiguiente(){
    const paginaSiguiente = document.querySelector('#siguiente');
    paginaSiguiente.addEventListener('click', function (){
        if(paso < pasoFinal)
        paso++;
        console.log(paso);
        mostrarSeccion();
        botonesPaginador();
    });
}

function botonesPaginador(){
    const paginaAnterior  = document.querySelector('#anterior');
    const paginaSiguiente = document.querySelector('#siguiente');
    
    if ((paso - pasoInicial) === 0){
        paginaAnterior.classList.add('ocultar');
        paginaSiguiente.classList.remove('ocultar');
    }else if ((paso - pasoFinal) === 0){
        paginaSiguiente.classList.add('ocultar');
        paginaAnterior.classList.remove('ocultar');
    }else {
        paginaSiguiente.classList.remove('ocultar');
        paginaAnterior.classList.remove('ocultar');
    }

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
            botonesPaginador();

        });
    });
}

