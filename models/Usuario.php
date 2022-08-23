<?php
namespace Model;


class Usuario extends ActiveRecord{
    // Base de datos
    protected static $tabla='usuarios';
    protected static $columnasDB =['id', 'nombre', 'apellido', 'email', 'password', 'telefono', 'admin', 'confirmado', 'token'];

    
    public $id; 
    public $nombre; 
    public $apellido; 
    public $email;
    public $password; 
    public $telefono;
    public $admin;
    public $confirmado; 
    public $token;

    public function __construct( $args = []) {

        $this->id         = $args['id'        ] ?? NULL; 
        $this->nombre     = $args['nombre'    ] ?? ''; 
        $this->apellido   = $args['apellido'  ] ?? ''; 
        $this->email      = $args['email'     ] ?? '';
        $this->password   = $args['password'  ] ?? ''; 
        $this->telefono   = $args['telefono'  ] ?? '';
        $this->admin      = $args['admin'     ] ?? NULL;
        $this->confirmado = $args['confirmado'] ?? NULL; 
        $this->token      = $args['token'     ] ?? '';
    }

    // Mensajes de validadcion para la creacion de la cuenta
    public function validarNuevaCuenta(){
        if(!$this -> nombre)
            self::$alertas['error'][] = 'El nombre del cliente es obligatorio';
        
        return self::$alertas;
    }
}