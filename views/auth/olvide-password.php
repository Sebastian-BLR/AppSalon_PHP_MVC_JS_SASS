<h1 class="nombre-pagina">Olvide Password</h1>
<p class="descripcion-pagina">Reestablece tu password escribiendo tu email a continuación</p>

<?php include_once __DIR__ . '/../templates/alertas.php'; ?>

<form action="/olvide" class="formulario" method="POST">
    <div class="campo">
        <label for="email">E-mail:</label>
        <input type="email" id="email" placeholder="Tu E-mail" name="email">
    </div>

    <input class='boton' type="submit" value="Enviar instrucciones">
</form>

<div class="acciones">
    <a href="/">¿Ya tienes una cuenta? Inicia Sesíon</a>
    <a href="/crear-cuenta">¿Aún no tienes una cuenta? Crear una</a>
</div>