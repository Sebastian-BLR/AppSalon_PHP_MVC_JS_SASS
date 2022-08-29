<?php

namespace Classes;

use PHPMailer\PHPMailer\PHPMailer;

class Email{
    
    public $email;
    public $nombre;
    public $token;

    public function __construct($email, $nombre, $token){
        $this -> email  = $email;
        $this -> nombre = $nombre;
        $this -> token  = $token;
    }

    public function enviarConfirmacion(){
        // crear el objeto de mial
        $mail  = new PHPMailer();
       
        // Configurar credenciales
        $mail -> isSMTP();
        $mail -> Host     = 'smtp.mailtrap.io';
        $mail -> SMTPAuth = true;
        $mail -> Port     = 2525;
        $mail -> Username = '0da082e6ba03fc';
        $mail -> Password = '2c9f908d29018c';
       
        // Configurar datos 
        $mail -> setFrom('cuentas@appsalon.com');
        $mail -> addAddress('Cuentas@appsalon.com');
        $mail -> Subject = 'Confirma tu cuenta';
       
        // configurar como sera el contenido
        $mail -> isHTML(true);
        $mail -> CharSet = 'UTF-8';
       
        // contenido del mail
        $contenido  = "<html>";
        $contenido .= "<p><strong>Hola {$this -> nombre}</strong>";
        $contenido .= " Has Creado tu cuenta en App Salón, solo debes confirmarla presionando en siguiente enlace</p>";
        $contenido .= "<p>Presiona aquí: <a href='http://localhost:3000/confirmar-cuenta?token={$this -> token}'>";
        $contenido .= "Confirmar Cuenta</a></p>";
        $contenido .= "<p>Sí tu no solicitaste esta cuenta, puedes ignorar el mensaje</p>";
        $contenido .= "</html>";
        $mail -> Body = $contenido;
        
        // Enviar mail
        $mail -> send();


    }

    public function enviarInstrucciones(){
        // crear el objeto de mial
        $mail  = new PHPMailer();

        // Configurar credenciales
        $mail -> isSMTP();
        $mail -> Host     = 'smtp.mailtrap.io';
        $mail -> SMTPAuth = true;
        $mail -> Port     = 2525;
        $mail -> Username = '0da082e6ba03fc';
        $mail -> Password = '2c9f908d29018c';
        
        // Configurar datos 
        $mail -> setFrom('cuentas@appsalon.com');
        $mail -> addAddress('Cuentas@appsalon.com');
        $mail -> Subject = 'Restablece tu password';
        
        // configurar como sera el contenido
        $mail -> isHTML(true);
        $mail -> CharSet = 'UTF-8';
        
        // contenido del mail
        $contenido  = "<html>";
        $contenido .= "<p style = 'font-size:30px;'>Hola <strong>{$this -> nombre}</strong>.</p>";
        $contenido .= "<p>Has solocitado restablecer tu password en App Salón, solo debes presionar en el siguiente enlace</p>";
        $contenido .= "<p>Presiona aquí: <a href='http://localhost:3000/recuperar?token={$this -> token}'>";
        $contenido .= "Restablece tu Password</a></p>";
        $contenido .= "<p>Sí tu no solicitaste restablecer tu password, puedes ignorar el mensaje</p>";
        $contenido .= "</html>";
        $mail -> Body = $contenido;
        
        // Enviar mail
        $mail -> send();
    }
}