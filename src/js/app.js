let paso = 1;
const pasoInicial = 1;
const pasoFinal   = 3;

const cita ={
    id:        '', 
    nombre:    '',
    fecha:     '',
    hora:      '',
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
    idCliente();// Agrega el id del cliente al objeto de cita
    seleccionarFecha();// Agrega la cita al objeto de cita
    seleccionarHora();// Agrega la hora de la cita al objeto'
    mostrarResumen();// Muestra el resumen de la cita
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
        nombreServicio.classList.add('nombre-servicio');
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
    // obtengo los servicios de cita
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
        mostrarSeccion();
        botonesPaginador();
    });
}

function paginaSiguiente(){
    const paginaSiguiente = document.querySelector('#siguiente');
    paginaSiguiente.addEventListener('click', function (){
        if(paso < pasoFinal)
        paso++;
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
        mostrarResumen();
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

function idCliente(){
     cita.id = document.querySelector('#id').value;
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


function seleccionarHora(){
    const inputHora = document.querySelector('#hora');
    inputHora.addEventListener('input', e =>{
        const horaSeleccionada = e.target.value;
        const hora = horaSeleccionada.split(":")[0];
        if(hora < 9 || hora > 18){
            e.target.value = '';
            cita.hora = '';
            mostrarAlerta('error', 'Hora no valida')
        }else{
            cita.hora = horaSeleccionada;
        }
    });
}

function mostrarAlerta(tipo, mensaje, elemento = '.formulario', desaparece = true){

    const alertaexistente = document.querySelector('.alerta');
    if(alertaexistente) 
        alertaexistente.remove();
    


    const alerta = document.createElement("DIV");
    alerta.textContent = mensaje;
    alerta.classList.add('alerta');
    alerta.classList.add(tipo);

    const referencia = document.querySelector(elemento);
    
    referencia.appendChild(alerta);
    if(desaparece)
        setTimeout(() => {
            alerta.remove();
        }, 3000);
    
}

function mostrarResumen(){
    const resumen             = document.querySelector('.contenido-resumen');
    const validacionInfo      = !Object.values(cita).includes(''); 
    const validacionServicios = cita.servicios.length !== 0;
    
    // Limpiar el contenido de resumen
    while(resumen.firstChild){
            resumen.removeChild(resumen.firstChild);
    }


// Errores
    if (!validacionInfo && !validacionServicios){
        // Faltan datos 
        mostrarAlerta('error','Faltan Servicios e Informacion', '.contenido-resumen',false);
    }else{
        if(!validacionInfo){
            // Falta info
        mostrarAlerta('error','Falta Informacion para la cita', '.contenido-resumen',false);
        }   
        if(!validacionServicios){
            // faltan servicios
        mostrarAlerta('error','Seleccione almenos un servicio', '.contenido-resumen',false);
        }
    }

    if(!validacionInfo || !validacionServicios) return;

    // Exito

    // Formatear el div de resumen
    const {nombre , fecha, hora, servicios} = cita;

    const nombreCliente = document.createElement('P');
    nombreCliente.innerHTML = `<span>Nombre:</span> ${nombre}`;

    fechaFormateada = formatearFechaEs(fecha);

    const fechaCita = document.createElement('P');
    fechaCita.innerHTML = `<span>Fecha:</span> ${fechaFormateada}`;

    const horaCita = document.createElement('P');
    horaCita.innerHTML = `<span>Hora:</span> ${hora}hrs`;

    const tituloInfo = document.createElement("DIV");
    tituloInfo.classList.add('titulo-cita');
    tituloInfo.innerHTML = '<h3>Datos de la cita</h3>';
    resumen.appendChild(tituloInfo);

    resumen.appendChild(nombreCliente);
    resumen.appendChild(fechaCita);
    resumen.appendChild(horaCita);

    let total = 0;

    const tituloServicios = document.createElement("DIV");
    tituloServicios.classList.add('titulo-servicios');
    tituloServicios.innerHTML = '<h3>Servicios Solicitados</h3>';
    resumen.appendChild(tituloServicios);

    // iterando en los servicios
    servicios.forEach(servicio =>{
        const {id, nombre, precio} = servicio;

        const contenedorServicio = document.createElement('DIV');
        contenedorServicio.classList.add('contenedor-servicio');

        const nombreServicio = document.createElement("P")
        nombreServicio.textContent = nombre;
        
        const precioServicio = document.createElement("P")
        precioServicio.classList.add('precio-cita');
        precioServicio.innerHTML = `<span>Precio:</span> $${precio}`;



        contenedorServicio.appendChild(nombreServicio);
        contenedorServicio.appendChild(precioServicio);

        resumen.appendChild(contenedorServicio);
        total +=  parseFloat(precio);
    });

    const precioTotal = document.createElement("P")
    precioTotal.classList.add('precio-cita');
    precioTotal.innerHTML = `<span>Total:</span> $${total.toFixed(2)}`;
    resumen.appendChild(precioTotal);

    const btnReservar = document.createElement('BUTTON');
    btnReservar.classList.add('boton');
    btnReservar.classList.add('r-boton');
    btnReservar.textContent = 'Reservar Cita';
    btnReservar.onclick = reservarCita;
    resumen.appendChild(btnReservar);



}



async function reservarCita(){

    const {id, fecha, hora, servicios} = cita;
    const idServicios = servicios.map(servicio => servicio.id);

    
    const datos = new FormData();   
    datos.append('usuarioId', id);
    datos.append('fecha', fecha);
    datos.append('hora', hora);
    datos.append('idServicios', idServicios);
    // console.log([...datos]);

    
    try {
        const url = 'http://localhost:3000/api/citas';

        const respuesta = await fetch(url, {
            method: 'POST',
            body: datos
        });
    
        const resultado = await respuesta.json();
        $citaGuardada =resultado.resultado;
        if($citaGuardada)
            Swal.fire({
                icon: 'success',
                title: 'Cita Creada',
                text: 'Se guardo correctamente su cita',
            }).then(() => {
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            });    
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: `Hubo un error al guardar la cita`,
        })
    }
    
}


function formatearFechaEs(fecha){
    // fotmatear la fecha en español
    const fechaObj = new Date(fecha);
    const mes  = fechaObj.getMonth();
    const dia  = fechaObj.getDate() + 2;
    const year = fechaObj.getFullYear();

    const fechaUTC = new Date(Date.UTC(year, mes, dia));

    const opciones = {weekday: 'long', year: 'numeric', month: 'long', day:'numeric'};
    const fechaFormateada = fechaUTC.toLocaleDateString('es-MX', opciones);

    return fechaFormateada;
}
