<h1 class="nombre-pagina">Servicios</h1>
<p class="descripcion-pagina">Administación de Servicios</p>

<?php include_once __DIR__ . '/../templates/barra.php';?>
<ul class="servicios">
    <?php foreach($servicios as $servicio):?>
            <li>
                <p>Nombre: <span> <?php echo sz($servicio -> nombre);?></span></p>
                <p>Precio: <span> $<?php echo sz($servicio -> precio);?></span></p>
            </li>
    <?php endforeach;?>
</ul>