<?php

function debuguear($variable, $stop = true) : void {
    echo "<pre>";
    var_dump($variable);
    echo "</pre>";
    if($stop)
        exit;
}

// Escapa / Sanitizar el HTML
function sz($html) : string {
    $sz = htmlspecialchars($html);
    return $sz;
}

// Funcion que revisa si el usuario esta autenticado

function isAuth() : void {
    if(!isset($_SESSION['login']))
        header('Location: /');
}