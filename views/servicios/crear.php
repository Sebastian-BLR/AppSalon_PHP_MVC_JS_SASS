<h1 class="nombre-pagina">Nuevo Servico</h1>
<p class="descripcion-pagina">Llena todos los campos para crear un servicio</p>

<?php include_once __DIR__ . '/../templates/barra.php';?>

<form action="/servicios/crear" method="post" class="formulario">
    <?php include_once __DIR__ . '/formulario.php';?>
    <input type="submit" value="Guardar Servicio" class="boton r-boton">
</form>