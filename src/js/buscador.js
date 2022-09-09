document.addEventListener('DOMContentLoaded', () =>{
    iniciarApp();
});

function iniciarApp(){
    buscarPorFecha(); 
}

function buscarPorFecha(){
    const fechaInput = document.querySelector('#fecha');
    fechaInput.addEventListener('input', e =>{
        const fechaSelecionada = e.target.value;
        window.location = `?fecha=${fechaSelecionada}`;        
    });
}