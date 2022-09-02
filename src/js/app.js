let paso = 1;
const pasoInicial = 1;
const pasoFinal   = 3;

const cita ={
    nombre: '',
    fecha:  '',
    hora:   '',
    servicios: []
}
document.addEventListener('DOMContentLoaded', function(){
    iniciarApp();
});

function iniciarApp(){
    mostrarSeccion();
    tabs(); //Cambia la Seccion cuando se precionen los tabs
    botonesPaginador();// agreaga o quita los botones al paginador
    paginaAnterior();
    paginaSiguiente();
    consultarAPI();//Consulta la API en el baken de php
    nombreCliente();// Agrega el nombre del cliente al objeto de cita
    seleccionarFecha();// Agrega la cita al objeto de cita
}

async function consultarAPI(){
    try {
        const url = 'http://localhost:3000/api/servicios';
        const resultado = await fetch(url);
        const servicios = await resultado.json();
        mostrarServicios(servicios);
   
    } catch (error) {
        console.log(error);
    }
}

function mostrarServicios(servicios){
    servicios.forEach( servicio => {
        // destroying
        const {id, nombre, precio} = servicio; 

        const nombreServicio = document.createElement('p');
        nombreServicio.classList.add('nombre-servico');
        nombreServicio.textContent = nombre;
        
        const precioServicio = document.createElement('p');
        precioServicio.classList.add('precio-servicio');
        precioServicio.textContent = `$${precio}`;

        const servicioDiv = document.createElement('div');
        servicioDiv.classList.add('servicio');
        servicioDiv.dataset.idServicio = id;
        servicioDiv.onclick = () => seleccionarServicio(servicio);
        // agragar los parrafos
        servicioDiv.appendChild(nombreServicio);
        servicioDiv.appendChild(precioServicio);

        // Se agrega al html 
        document.querySelector('#servicios').appendChild(servicioDiv);

    });
}

function seleccionarServicio(servicio){
    const {id} = servicio;
    // obtengo los servicos de cita
    const {servicios} = cita;
    
    // identificar el servicio
    const servicioSeleccionado = document.querySelector(`[data-id-servicio='${id}']`);
    // comprobar si un servivio ya esta agregado
    if(servicios.some(agregado => agregado.id === id)){
        // Eliminarlo
        cita.servicios = servicios.filter(agregado => agregado.id !== id);
        servicioSeleccionado.classList.remove('seleccionado');
    }else{
        // Agregarlo
        // agrego los nuevos servicios a la cita
        cita.servicios = [...servicios, servicio];
        servicioSeleccionado.classList.add("seleccionado"); 

    }


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
            paso = parseInt(e.target.dataset.paso);
            mostrarSeccion();
            botonesPaginador();

        });
    });
}

function nombreCliente(){
     cita.nombre = document.querySelector('#nombre').value;
}

function seleccionarFecha(){
    const sabado  = 6;
    const domingo = 0;
    const inputFecha = document.querySelector('#fecha');
    inputFecha.addEventListener('input', e => {
         const fechaSeleccionada = e.target.value;
         const dia = new Date(fechaSeleccionada).getUTCDay();
        
        //  if(dia !== sabado && dia !== domingo ){
        if(![sabado,domingo].includes(dia)){
            cita.fecha = fechaSeleccionada;
        }else{
            mostrarAlerta('error','No abrimos Sabados y Domingos');
            e.target.value = '';

        }
    });
}

function mostrarAlerta(tipo, mensaje){

    const alertaexistente = document.querySelector('#paso-2 p .alerta');
    if(alertaexistente) return;


    const alerta = document.createElement("DIV");
    alerta.textContent = mensaje;
    alerta.classList.add('alerta');
    alerta.classList.add(tipo);

    const formulario = document.querySelector('#paso-2 p');
    
    formulario.appendChild(alerta);
    setTimeout(() => {
        alerta.remove();
    }, 3000);
    
}
