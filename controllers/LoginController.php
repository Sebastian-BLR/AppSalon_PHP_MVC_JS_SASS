<?php
namespace Controllers;

class LoginController {
    // Iniciar sesion
    public static function login(){
        echo 'Desde login';
    }

    // Cerrar sesion
    public static function logout(){
        echo 'Desde logout';
    }
    
    // Recuperar password
    public static function olvide(){
        echo 'Desde olvide';
    }

    public static function recuperar(){
        echo 'Desde Recuperar';
    }

    // Crear cuenta
    public static function crear(){
        echo 'Desde crear';
    }

}