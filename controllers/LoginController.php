<?php
namespace Controllers;

use MVC\Router;

class LoginController {
    // Iniciar sesion
    public static function login(Router $router){
        $router -> render('auth/login');
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
    public static function crear(Router $router){
        $router -> render('auth/crear-cuenta');
    }

}