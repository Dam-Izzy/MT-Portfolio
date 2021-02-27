<?php   
if (isset($_POST['submitForm'])) {
    $captcha_response = true;
    $recaptcha = $_POST['g-recaptcha-response'];
 
    $url = 'https://www.google.com/recaptcha/api/siteverify';
    $data = array(
        'secret' => '6Le4hDEaAAAAAHz0liCGquoeZb2SEwqP1vC3L75M',
        'response' => $recaptcha
    );
    $options = array(
        'http' => array (
            'method' => 'POST',
            'content' => http_build_query($data)
        )
    );
    $context  = stream_context_create($options);
    $verify = file_get_contents($url, false, $context);
    $captcha_success = json_decode($verify);
    $captcha_response = $captcha_success->success;
 
    if ($captcha_response) {
    $nombre = $_POST['nombre'];
    $correo = $_POST['correo'];
    $telefono = $_POST['telefono'];
    $asunto  = $_POST['asunto'];

    $destinatario = "damaso7295@gmail.com";
    $carta = "De: $nombre \n";
    $carta .= "Correo: $correo \n";
    $carta .= "Telefono: $telefono \n";
    $carta .= "Mensaje: $asunto ";

    // Enviando Mensaje
    if (filter_var($correo, FILTER_VALIDATE_EMAIL)) {
        
        echo "Hola ($nombre), sus datos fueron registrados.";
        mail($destinatario, $asunto, $carta);
    }
    else{
        echo "Esta dirección de correo ($correo) no es válida.";
    }
    } 
    else {
        echo 'Debes indicar que no eres un robot.';
    }

}

?>