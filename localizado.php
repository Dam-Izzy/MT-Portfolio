<?php
//incluimos simple html dom
require_once('simple_html_dom.php');
//variable longitud
$long = $_POST['long'];
//variable latitud
$lat = $_POST['lat'];
//buscamos el resultado con la latitud y longitud de google maps
$html = file_get_html("https://maps.google.es/maps?q=$lat,$long");
//buscamos el resultado del código postal y la província localizada con simple html dom
foreach($html->find('span[class=pp-headline-item pp-headline-address]') as $element)
//$element es el resultado
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Geolocalizador web</title>
<link href="css/reset.css" rel="stylesheet" style="text/css" />
<link href="css/main.css" rel="stylesheet" style="text/css" media="screen" />
</head>
<body>
	<div id="container">
		<h1>¡Localizado!</h1>
		<h2>Tu posici&oacute;n es:</h2>
		<p class="pos">
			<?php echo $element; ?>
		</p>
		<a href='<?php echo "https://www.google.es/maps/place/$lat,$long"; ?>' target="_blank"><button class="map">Ver en google maps</button></a>
	</div>
</body>
</html>