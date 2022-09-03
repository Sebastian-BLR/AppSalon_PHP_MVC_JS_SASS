let paso=1;const pasoInicial=1,pasoFinal=3,cita={nombre:"",fecha:"",hora:"",servicios:[]};function iniciarApp(){mostrarSeccion(),tabs(),botonesPaginador(),paginaAnterior(),paginaSiguiente(),consultarAPI(),nombreCliente(),seleccionarFecha(),seleccionarHora(),mostrarResumen()}async function consultarAPI(){try{const e="http://localhost:3000/api/servicios",t=await fetch(e);mostrarServicios(await t.json())}catch(e){console.log(e)}}function mostrarServicios(e){e.forEach(e=>{const{id:t,nombre:o,precio:a}=e,n=document.createElement("p");n.classList.add("nombre-servicio"),n.textContent=o;const c=document.createElement("p");c.classList.add("precio-servicio"),c.textContent="$"+a;const r=document.createElement("div");r.classList.add("servicio"),r.dataset.idServicio=t,r.onclick=()=>seleccionarServicio(e),r.appendChild(n),r.appendChild(c),document.querySelector("#servicios").appendChild(r)})}function seleccionarServicio(e){const{id:t}=e,{servicios:o}=cita,a=document.querySelector(`[data-id-servicio='${t}']`);o.some(e=>e.id===t)?(cita.servicios=o.filter(e=>e.id!==t),a.classList.remove("seleccionado")):(cita.servicios=[...o,e],a.classList.add("seleccionado"))}function paginaAnterior(){document.querySelector("#anterior").addEventListener("click",(function(){paso>1&&paso--,mostrarSeccion(),botonesPaginador()}))}function paginaSiguiente(){document.querySelector("#siguiente").addEventListener("click",(function(){paso<3&&paso++,mostrarSeccion(),botonesPaginador()}))}function botonesPaginador(){const e=document.querySelector("#anterior"),t=document.querySelector("#siguiente");paso-1==0?(e.classList.add("ocultar"),t.classList.remove("ocultar")):paso-3==0?(t.classList.add("ocultar"),e.classList.remove("ocultar"),mostrarResumen()):(t.classList.remove("ocultar"),e.classList.remove("ocultar"))}function mostrarSeccion(){const e=document.querySelector(".mostrar");e&&e.classList.remove("mostrar");document.querySelector("#paso-"+paso).classList.add("mostrar");const t=document.querySelector(".actual");t&&t.classList.remove("actual");document.querySelector(`[data-paso = "${paso}"]`).classList.add("actual")}function tabs(){document.querySelectorAll(".tabs button").forEach(e=>{e.addEventListener("click",(function(e){paso=parseInt(e.target.dataset.paso),mostrarSeccion(),botonesPaginador()}))})}function nombreCliente(){cita.nombre=document.querySelector("#nombre").value}function seleccionarFecha(){const e=6,t=0;document.querySelector("#fecha").addEventListener("input",o=>{const a=o.target.value,n=new Date(a).getUTCDay();[e,t].includes(n)?(mostrarAlerta("error","No abrimos Sabados y Domingos"),o.target.value=""):cita.fecha=a})}function seleccionarHora(){document.querySelector("#hora").addEventListener("input",e=>{const t=e.target.value,o=t.split(":")[0];o<9||o>18?(e.target.value="",cita.hora="",mostrarAlerta("error","Hora no valida")):cita.hora=t})}function mostrarAlerta(e,t,o=".formulario",a=!0){const n=document.querySelector(".alerta");n&&n.remove();const c=document.createElement("DIV");c.textContent=t,c.classList.add("alerta"),c.classList.add(e);document.querySelector(o).appendChild(c),a&&setTimeout(()=>{c.remove()},3e3)}function mostrarResumen(){const e=document.querySelector(".contenido-resumen"),t=!Object.values(cita).includes(""),o=0!==cita.servicios.length;for(;e.firstChild;)e.removeChild(e.firstChild);if(t||o?(t||mostrarAlerta("error","Falta Informacion para la cita",".contenido-resumen",!1),o||mostrarAlerta("error","Seleccione almenos un servicio",".contenido-resumen",!1)):mostrarAlerta("error","Faltan Servicios e Informacion",".contenido-resumen",!1),!t||!o)return;const{nombre:a,fecha:n,hora:c,servicios:r}=cita,i=document.createElement("P");i.innerHTML="<span>Nombre:</span> "+a,fechaFormateada=formatearFechaEs(n);const s=document.createElement("P");s.innerHTML="<span>Fecha:</span> "+fechaFormateada;const d=document.createElement("P");d.innerHTML=`<span>Hora:</span> ${c}hrs`;const l=document.createElement("DIV");l.classList.add("titulo-cita"),l.innerHTML="<h3>Datos de la cita</h3>",e.appendChild(l),e.appendChild(i),e.appendChild(s),e.appendChild(d);let m=0;const u=document.createElement("DIV");u.classList.add("titulo-servicios"),u.innerHTML="<h3>Servicios Solicitados</h3>",e.appendChild(u),r.forEach(t=>{const{id:o,nombre:a,precio:n}=t,c=document.createElement("DIV");c.classList.add("contenedor-servicio");const r=document.createElement("P");r.textContent=a;const i=document.createElement("P");i.classList.add("precio-cita"),i.innerHTML="<span>Precio:</span> $"+n,c.appendChild(r),c.appendChild(i),e.appendChild(c),m+=parseFloat(n)});const p=document.createElement("P");p.classList.add("precio-cita"),p.innerHTML="<span>Total:</span> $"+m.toFixed(2),e.appendChild(p);const h=document.createElement("BUTTON");h.classList.add("boton"),h.classList.add("r-boton"),h.textContent="Reservar Cita",h.onclick=reservarCita,e.appendChild(h)}async function reservarCita(){const{nombre:e,fecha:t,hora:o,servicios:a}=cita,n=a.map(e=>e.id),c=new FormData;c.append("nombre",e),c.append("fecha",t),c.append("hora",o),c.append("idServicios",n);const r=await fetch("http://localhost:3000/api/citas",{method:"POST",body:c}),i=await r.json();console.log(i)}function formatearFechaEs(e){const t=new Date(e),o=t.getMonth(),a=t.getDate()+2,n=t.getFullYear();return new Date(Date.UTC(n,o,a)).toLocaleDateString("es-MX",{weekday:"long",year:"numeric",month:"long",day:"numeric"})}document.addEventListener("DOMContentLoaded",(function(){iniciarApp()}));