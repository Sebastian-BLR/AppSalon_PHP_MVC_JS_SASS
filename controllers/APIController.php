<?php
namespace Controllers;

use Model\Servicio;

class APIController{
    public static function index(){
        $servicios = Servicio::all();
        echo json_encode($servicios);
    }

    public static function guardar(){
        
        if($_SERVER['REQUEST_METHOD'] ==='POST'){
        $respuesta = [
            'mensaje' => $_POST
        ];

        echo json_encode($respuesta);
        }
    }
}