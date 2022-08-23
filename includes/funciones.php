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