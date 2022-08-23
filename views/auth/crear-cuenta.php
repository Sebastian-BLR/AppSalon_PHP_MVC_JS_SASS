<h1 class="nombre-pagina">Crear cuenta</h1>
<p class="descripcion-pagina">Llena el siguiente formulario para crear una cuenta</p>

<?php include_once __DIR__ . '/../templates/alertas.php'; ?>
<form action="/crear-cuenta" class="formulario" method="POST">

    <div class="campo">
        <label for="nombre">Nombre:</label>
        <input type="text" id="nombre" name="nombre" value="<?php echo sz($usuario -> nombre); ?>" placeholder="Tu nombre">
    </div>

    <div class="campo">
        <label for="apellido">Apellido:</label>
        <input type="text" id="apellido" name="apellido" value="<?php echo sz($usuario -> apellido); ?>" placeholder="Tu apellido">
    </div>

    <div class="campo">
        <label for="telefon">Teléfono:</label>
        <input type="tel" id="telefono" name="telefono" value="<?php echo sz($usuario -> telefono); ?>" placeholder="Tu Teléfono">
    </div>

    <div class="campo">
        <label for="email">E-mail:</label>
        <input type="email" id="email" name="email" value="<?php echo sz($usuario -> email ); ?>" placeholder="Tu E-mail">
    </div>

    <div class="campo">
        <label for="password">Password:</label>
        <input type="password" id="password" name="password"  placeholder="Tu Password">
    </div>

    <input class="boton" type="submit" value="Crear Cuenta">
</form>

<div class="acciones">
    <a href="/">¿Ya tienes una cuenta? Inicia Sesíon</a>
    <a href="/olvide">¿Olvidaste tu password?</a>
</div>