<?php
namespace Controllers;

use Classes\Email;
use Model\Usuario;
use MVC\Router;

class LoginController {
    // Iniciar sesion
    public static function login(Router $router){
        $alertas=[];

        if($_SERVER['REQUEST_METHOD'] === 'POST'):
            $auth    = new Usuario($_POST);
            $alertas = $auth -> validarLogin();

            if( empty($alertas) ){
                // comprobar que exixta el usuario
                $usuario = Usuario::where('email', $auth -> email);

                if($usuario)
                    $usuario -> comprobarPasswordAndVerificado($auth -> password);
                else
                    Usuario::setAlerta('error', 'El usuario no existe');
            }
        endif; //$_SERVER['REQUEST_METHOD'] === 'POST'





        $alertas = Usuario::getAlertas();
        $router -> render('auth/login',[
            'alertas' => $alertas
        ]);
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
        
        // Alertas vacias
        $alertas = [];

        if($_SERVER['REQUEST_METHOD'] === 'POST'):
            $usuario -> sincronizar($_POST);
            $alertas = $usuario -> validarNuevaCuenta();

            // Revisar que alertas este vacio
            if(empty($alertas)){
                // verificar que el usuario no este registrado
                $resultado = $usuario -> existeUsuario();
                if($resultado -> num_rows)
                    $alertas = Usuario::getAlertas();
                else{
                    // Hashear el Password
                    $usuario -> hashPassword();

                    // Generar un Token único
                    $usuario -> crearToken();

                    // Enviar el Email
                    $email = new Email($usuario -> email, $usuario -> nombre, $usuario -> token);

                    $email -> enviarConfirmacion();

                    // Crear usuario
                    $resultado = $usuario ->guardar();
                    
                    if($resultado)
                        // Mensaje de confirmacion
                        header('Location: /mensaje');

                }
            }
        endif; // $_SERVER['REQUEST_METHOD'] === 'POST'

        $router -> render('auth/crear-cuenta',[
            'usuario' => $usuario,
            'alertas' => $alertas
        ]);
    }

    public static function mensaje(Router $router){
        $router -> render('auth/mensaje');
    }

    public static function confirmar(Router $router){
        $alertas = [];
        $token = $_GET['token'] ?? '';
        $token = sz($token);
        $usuario = Usuario::where('token', $token);
        
        if(!empty($usuario)){
            $usuario -> confirmado = '1';
            $usuario -> token = null;
            $usuario -> guardar();
            Usuario::setAlerta('exito', 'Cuenta Comprobada Correctamente');

        }else
            Usuario::setAlerta('error', 'Token no valido');
        
        $alertas = Usuario::getAlertas();
        $router -> render('auth/confirmar-cuenta',[
            'alertas' => $alertas
        ]);
    }
}