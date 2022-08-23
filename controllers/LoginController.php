<?php
namespace Controllers;

use Model\Usuario;
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
    public static function olvide(Router $router){
        $router -> render('auth/olvide-password');
    }

    public static function recuperar(){
        echo 'Desde Recuperar';
    }

    // Crear cuenta
    public static function crear(Router $router){
        $usuario = new Usuario();
        
        if($_SERVER['REQUEST_METHOD'] === 'POST'){
            $usuario -> sincronizar($_POST);
            $alertas = $usuario -> validarNuevaCuenta();

            debuguear($alertas);

        }

        $router -> render('auth/crear-cuenta',[
            'usuario' => $usuario
        ]);
    }

}