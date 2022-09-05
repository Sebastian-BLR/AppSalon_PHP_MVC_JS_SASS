<?php
namespace Controllers;

use Model\Cita;
use Model\CitaServicio;
use Model\Servicio;

class APIController{
    public static function index(){
        $servicios = Servicio::all();
        echo json_encode($servicios);
    }

    public static function guardar(){
        
        if($_SERVER['REQUEST_METHOD'] ==='POST'){
        
        // Almacena la Cita y devuelve el ID
        $cita = new Cita($_POST);
        $resultado = $cita -> guardar(); 
        $id = $resultado['id'];
        // Almacena la Cita y el Servicio
        
        $idServicios = explode( ',',$_POST['idServicios']);
        $resultadoCitaServicio = [];
        // Almacena los servicos con el ID de cita
        foreach($idServicios as $idServicio){
            $args = ['citaId' => $id,
                     'servicioId' => $idServicio];
            $citaServicio = new CitaServicio($args);
            $citaServicio -> guardar();
            $resultadoCitaServicio[] = $citaServicio; 
        }

        
        echo json_encode(['resultado' => $resultado]);
        }
    }
}