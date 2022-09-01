let paso=1;const pasoInicial=1,pasoFinal=3,cita={nombre:"",fecha:"",hora:"",servicios:[]};function iniciarApp(){mostrarSeccion(),tabs(),botonesPaginador(),paginaAnterior(),paginaSiguiente(),consultarAPI(),nombreCliente(),seleccionarFecha()}async function consultarAPI(){try{const e="http://localhost:3000/api/servicios",o=await fetch(e);mostrarServicios(await o.json())}catch(e){console.log(e)}}function mostrarServicios(e){e.forEach(e=>{const{id:o,nombre:t,precio:c}=e,a=document.createElement("p");a.classList.add("nombre-servico"),a.textContent=t;const n=document.createElement("p");n.classList.add("precio-servicio"),n.textContent="$"+c;const s=document.createElement("div");s.classList.add("servicio"),s.dataset.idServicio=o,s.onclick=()=>seleccionarServicio(e),s.appendChild(a),s.appendChild(n),document.querySelector("#servicios").appendChild(s)})}function seleccionarServicio(e){const{id:o}=e,{servicios:t}=cita,c=document.querySelector(`[data-id-servicio='${o}']`);t.some(e=>e.id===o)?(cita.servicios=t.filter(e=>e.id!==o),c.classList.remove("seleccionado")):(cita.servicios=[...t,e],c.classList.add("seleccionado"))}function paginaAnterior(){document.querySelector("#anterior").addEventListener("click",(function(){paso>1&&paso--,console.log(paso),mostrarSeccion(),botonesPaginador()}))}function paginaSiguiente(){document.querySelector("#siguiente").addEventListener("click",(function(){paso<3&&paso++,console.log(paso),mostrarSeccion(),botonesPaginador()}))}function botonesPaginador(){const e=document.querySelector("#anterior"),o=document.querySelector("#siguiente");paso-1==0?(e.classList.add("ocultar"),o.classList.remove("ocultar")):paso-3==0?(o.classList.add("ocultar"),e.classList.remove("ocultar")):(o.classList.remove("ocultar"),e.classList.remove("ocultar"))}function mostrarSeccion(){const e=document.querySelector(".mostrar");e&&e.classList.remove("mostrar");document.querySelector("#paso-"+paso).classList.add("mostrar");const o=document.querySelector(".actual");o&&o.classList.remove("actual");document.querySelector(`[data-paso = "${paso}"]`).classList.add("actual")}function tabs(){document.querySelectorAll(".tabs button").forEach(e=>{e.addEventListener("click",(function(e){paso=parseInt(e.target.dataset.paso),mostrarSeccion(),botonesPaginador()}))})}function nombreCliente(){cita.nombre=document.querySelector("#nombre").value}function seleccionarFecha(){const e=6,o=0;let t=0;document.querySelector("#fecha").addEventListener("input",c=>{const a=c.target.value,n=new Date(a).getUTCDay();[e,o].includes(n)?(mostrarAlerta("error","No abrimos Sabados y Domingos"),c.target.value=""):(cita.fecha=a,console.log(++t))})}function mostrarAlerta(e,o){if(document.querySelector("#paso-2 p .alerta"))return;const t=document.createElement("DIV");t.textContent=o,t.classList.add("alerta"),t.classList.add(e);document.querySelector("#paso-2 p").appendChild(t),setTimeout(()=>{t.remove()},3e3)}document.addEventListener("DOMContentLoaded",(function(){iniciarApp()}));