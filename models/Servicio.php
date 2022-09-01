<?php
namespace Model;

class Servicio extends ActiveRecord{
    // Base de datos 
    protected static $tabla     = 'servicios';
    protected static $columnaDB = ['id', 'nombre', 'precio'];

    public $id;
    public $nombre;
    public $precio;

    public function __construct($args = []){
        $this -> id     = $args['id']     ?? NULL;
        $this -> nombre = $args['nombre'] ?? '';
        $this -> precio = $args['precio'] ?? '';

        
    }
}