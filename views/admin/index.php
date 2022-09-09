<h1 class="nombre-pagina">Panel de Administración</h1>
<?Php include_once __DIR__ . '/../templates/barra.php' ?>
<h2>Buscar citas</h2>
<div class="busqueda">
    <form action="" class="formulario">
        <div class="campo">
            <label for="fecha">Fecha</label>
            <input type="date" name="facha" id="fecha" value="<?php echo $fecha; ?>">
        </div>
    </form>
</div>
<div id="citas-admin">
    <ul class="citas">
        <?php $idCita = null;
                foreach($citas as $key => $cita):
                    if($idCita !== $cita -> id):
                    $idCita = $cita -> id;
                    $total = 0;                        ?>
                        
                        <li>
                            <p>ID:       <span><?php echo sz($cita -> id);?>      </span></p>      
                            <p>HORA:     <span><?php echo sz($cita -> hora);?>    </span></p>      
                            <p>CLIENTE:  <span><?php echo sz($cita -> cliente);?> </span></p>      
                            <p>Email:    <span><?php echo sz($cita -> email);?>   </span></p>      
                            <p>TELEFONO: <span><?php echo sz($cita -> telefono);?></span></p>      
                            <h3>servicios</h3>
                        
                            <?php endif;
                                  $total += $cita -> precio;   ?>
                            
                            <p class="servicio"><?php echo sz($cita -> servicio) . " $" . $cita -> precio;?></p>      
                            
                            <?php  
                                $actual  = $cita -> id;
                                $proximo = $citas[$key +1] -> id ?? -1;
                                    
                                if(esUltimo($actual, $proximo)):         ?>
                                
                                <p>Total: <span>$<?php echo number_format($total, 2);?></span></p>
                <?php           
                                endif;
                endforeach;           ?>
    </ul>
</div>