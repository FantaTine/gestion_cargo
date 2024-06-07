<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use Twilio\Rest\Client;
use FPDF;
require '/var/www/html/GestionCargo/vendor/autoload.php';

function envoyerEmail($destinataire, $sujet, $message, $pdfAttachment = null) {
    $mail = new PHPMailer(true);
    try {
        // Configurer le serveur SMTP
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com'; // Remplacez par votre serveur SMTP
        $mail->SMTPAuth = true;
        $mail->Username = 'fantatine18@gmail.com'; // Remplacez par votre email
        $mail->Password = 'xykc msey qldh rges'; // Remplacez par votre mot de passe
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        // Destinataires
        $mail->setFrom('fantatine18@gmail.com', 'Cargo');
        $mail->addAddress($destinataire);

        // Contenu
        $mail->isHTML(true);
        $mail->Subject = $sujet; 
        $mail->Body    = $message;

        // Ajouter le fichier PDF en pièce jointe s'il est fourni
        if ($pdfAttachment) {
            $mail->addAttachment($pdfAttachment, 'details_produit.pdf');
        }

        $mail->send();
        echo 'Message has been sent';
        return true;
    } catch (Exception $e) {
        error_log("Message could not be sent. Mailer Error: {$mail->ErrorInfo}");
    }
}

function generatePDF($data) {
    $pdf = new FPDF();
    $pdf->AddPage();
    $pdf->SetFont('Arial', 'B', 16);

    // Ajouter les informations du produit
    $pdf->Cell(40, 10, 'Informations du produit');
    $pdf->Ln();
    $pdf->SetFont('Arial', '', 12);
    foreach ($data as $key => $value) {
        $pdf->Cell(40, 10, ucfirst($key) . ': ' . $value);
        $pdf->Ln();
    }

    $filePath = '/tmp/details_produit.pdf';
    $pdf->Output('F', $filePath);

    return $filePath;
}

header('Content-Type: application/json');
function ecrireJSON($filename, $data) {
    $json_data = json_encode($data, JSON_PRETTY_PRINT);
    if (file_put_contents($filename, $json_data) === false) {
        error_log("Erreur d'écriture dans le fichier $filename");
    }
}
function lireJSON($filename) {
    $json_data = file_get_contents($filename);
    if ($json_data === false) {
        error_log("Erreur de lecture du fichier $filename");
        return [];
    }
    return json_decode($json_data, true);
}

$filename = '/var/www/html/GestionCargo/src/cargaisons.json';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (isset($data['action']) && $data['action'] === 'ajoutcargaison') {
        // Vérifiez si le fichier existe, sinon initialisez les données
        if (!file_exists($filename)) {
            $currentData = ["cargaisons" => []];
        } else {
            // Lire les données existantes du fichier
            $currentData = json_decode(file_get_contents($filename), true);
            
            if ($currentData === null) {
                error_log("Erreur de décodage JSON pour le fichier $filename");
                echo json_encode(["status" => "error", "message" => "Erreur de lecture des données existantes"]);
                exit;
            }
        }

        // Nouvelle cargaison à ajouterujn 
        $newCargaison = [
            "type" => $data['type'],
            "code" => $data['code'], // Assuming this is a unique code provided by the user
            "poids" => $data['poids'],
            "distance" => $data['distance'],
            "dateDepartPrevue" => $data['dateDepartPrevue'],
            "dateArriveePrevue" => $data['dateArriveePrevue'],
            "lieuDepart" => $data['lieuDepart'],
            "lieuArrivee" => $data['lieuArrivee'],
            "status" => $data['status'],
            "etat" => $data['etat'],
            "produits" => $data['produits'],
            
        ];

        error_log("Nouvelle cargaison: " . print_r($newCargaison, true));

        // Ajouter la nouvelle cargaison au début de la liste
        array_unshift($currentData['cargaisons'], $newCargaison);

        // Écrire les données mises à jour dans le fichier
        ecrireJSON($filename, $currentData);

        // Re-lire le fichier pour vérifier
        $verifData = json_decode(file_get_contents($filename), true);
        error_log("Données après écriture: " . print_r($verifData, true));

        echo json_encode(["status" => "success", "message" => "Cargaison ajoutée avec succès"]);
        exit;
    } else if(isset($data['action']) && $data['action'] === 'ajoutproduit') {
        
      
        $currentData = lireJSON($filename);
        
        $newProduit = [
            "codepro" => $data['codepro'],
            "nomproduit" => $data['nomproduit'],
            "typeproduit" => $data['typeproduit'], // Assuming this is a unique code provided by the user
            "poids" => $data['poids'],
            "nomclient" => $data['nomclient'],
            "prenomclient" => $data['prenomclient'],
            "numclient" => $data['numclient'],
            "adressclient" => $data['adressclient'],
            "emailclient" => $data['emailclient'],
            "nomdestinataire" => $data['nomdestinataire'],
            "prenomdestinataire" => $data['prenomdestinataire'],
            "numdestinataire" => $data['numdestinataire'],
            "adressdestinataire" => $data['adressdestinataire'],
            "emaildestinataire" => $data['emaildestinataire'],
            "statut" => $data['statut'],
        
        ];
        foreach ($currentData['cargaisons'] as $key => $cargaison) {
            if ($cargaison['code'] == $data['idcargo']) {
                if (!isset($cargaison['produits'])) {
                    $cargaison['produits'] = [];
                }
                $currentData['cargaisons'][$key]['produits'][] =$newProduit; 
                // $cargaison['produits'][] = $newProduit;
                break;
            }
        }

        ecrireJSON($filename, $currentData);
        // Re-lire le fichier pour vérifier
        $verifData = json_decode(file_get_contents($filename), true);
        error_log("Données après écriture: " . print_r($verifData, true));

        echo json_encode(["status" => "success", "message" => "produit ajouté avec succès ".json_encode($currentData)]);

        // Générer le PDF avec les informations du produit
        $pdfFilePath = generatePDF($newProduit);

        envoyerEmail($data['emaildestinataire'], 'Enregistrement colis', 'Votre colis ' .$data['codepro'] . ' vient d\'être mis dans la cargaison', $pdfFilePath);
        envoyerEmail($data['emailclient'], 'Enregistrement colis', 'Votre colis ' .$data['codepro'] . ' vient d\'être mis dans la cargaison', $pdfFilePath);

        exit;
    } else if(isset($data['action']) && $data['action'] === 'changeEtat') {
        
      
        $currentData = lireJSON($filename);
        foreach ($currentData['cargaisons'] as $key => $cargaison) {
            if ($cargaison['code'] == $data['id']) {
             
                $currentData['cargaisons'][$key]['status'] =$data['status']; 
                break;
            }
        }

        ecrireJSON($filename, $currentData);
        // Re-lire le fichier pour vérifier
        $verifData = json_decode(file_get_contents($filename), true);
        error_log("Données après écriture: " . print_r($verifData, true));

        echo json_encode(["status" => "success", "message" => "status changer avec succès "]);
        exit;
    }
    else if(isset($data['action']) && $data['action'] === 'changeStatus') {
        
      
        $currentData = lireJSON($filename);
        foreach ($currentData['cargaisons'] as $key => $cargaison) {
            if ($cargaison['code'] == $data['idp']) {
             
                $currentData['cargaisons'][$key]['etat'] =$data['etat']; 
                break;
            }
        }

        ecrireJSON($filename, $currentData);
        // Re-lire le fichier pour vérifier
        $verifData = json_decode(file_get_contents($filename), true);
        error_log("Données après écriture: " . print_r($verifData, true));

        echo json_encode(["etat" => "success", "message" => "etat changer avec succès "]);
        exit;
    }
    else if(isset($data['action']) && $data['action'] === 'changeStatutProduit') {
        
      
        $currentData = lireJSON($filename);
        foreach ($currentData['cargaisons'] as $key => $cargaison) {
            foreach ($cargaison['produits'] as $key1 => $produit) {
            if ($produit['codepro'] == $data['id']) {
             
                $currentData['cargaisons'][$key]['produits'][$key1]['statut'] =$data['status']; 
                break;
            }
        }

        ecrireJSON($filename, $currentData);
        // Re-lire le fichier pour vérifier
        $verifData = json_decode(file_get_contents($filename), true);
        error_log("Données après écriture: " . print_r($verifData, true));

        echo json_encode(["status" => "success", "message" => "status changer avec succès "]);
        exit;
    }
}
    else {
        echo json_encode(["status" => "error", "message" => "Action non reconnue"]);
        exit;
    }

}elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $data = lireJSON($filename);
    if ($data === null) {
        echo json_encode(["status" => "error", "message" => "Erreur de lecture des données existantes"]);
    } else {
        echo json_encode($data);
    }
    exit;
}
?>
