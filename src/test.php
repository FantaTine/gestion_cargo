<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $file = 'cargaisons.json';

    $json = file_get_contents('php://input');
    
    $data = json_decode($json, true);

    $datas = json_decode(file_get_contents($file));

    $datas[] = $data;
    
    if (file_put_contents($file, json_encode($datas, JSON_PRETTY_PRINT))) {
        echo "succès";
    } else {
        echo "échec";
    }
}
?>
