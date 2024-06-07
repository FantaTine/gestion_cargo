<!DOCTYPE html>
<html lang="fr">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
</head>
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
<script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
<link href="./output.css" rel="stylesheet">
<title>Liste des Cargaisons</title>
<style>
  body {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  .pagination-button {
    padding: 10px;
    margin: 5px;
    cursor: pointer;
    border: 1px solid #ccc;
    border-radius: 5px;
  }

  .pagination-button:hover {
    background-color: #f0f0f0;
  }
</style>
</head>

<body class="bg-gray-100 p-2">
  <div class="flex flex-1 gap-4 w-full">
    <!-- Sidebar -->
    <aside class="w-64 bg-white shadow-md h-screen flex flex-col rounded-r-3xl border border-solid border-#122083">
      <div class="p-1 flex-grow">
        <div class="flex items-center mb-6">
          <img src="../src/images/gp.jpeg" alt="Logo" class="h-32 w-42 mt-3 ml-10 rounded-xl ">
        </div>
        <nav class="mt-10">
          <ul class="space-y-10">
            <li class="mb-2">
              <a href="#" class="flex items-center text-blue-900 text-2xl font-bold p-2 hover:bg-gray-200 rounded">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h18v18H3z"></path>
                </svg>
                <span>Dashboard</span>
              </a>
            </li>
            <li class="mb-2">
              <a href="index.html.php" class="flex items-center text-blue-900 text-2xl font-bold p-2 hover:bg-gray-200 rounded">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"></path>
                </svg>
                <span>Cargaisons</span>
              </a>
            </li>
            <li class="mb-2">
              <a href="produits.php" class="flex items-center text-2xl text-blue-900 font-bold p-2 hover:bg-gray-200 rounded">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7h6l7 10H3V7z"></path>
                </svg>
                <span>Produits / Colis</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
    <!-- Main Content -->
    <div class="flex-1 flex flex-col">
      <!-- Header -->
      <header class="bg-blue-900 text-white p-8 flex justify-between items-center">
        <div class="flex items-center gap-4">
          <button id="sidebarToggle" class="mr-4 text-blue-600">
            <img src="../src/images/nav.png" alt="" class="h-10 w-10 rounded-full">
          </button>
          <div class="flex items-center">
            <input type="text" placeholder="Rechercher" class="px-6 py-4 rounded-l bg-white text-gray-700 focus:outline-none">
            <button class="bg-blue-700 px-6 py-5 rounded-r">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35m1.65-5.65a7 7 0 10-14 0 7 7 0 0014 0z"></path>
              </svg>
            </button>
          </div>
        </div>
        <div class="ml-4">
          <img src="../src/images/pro.png" alt="Profil" class="h-10 w-10 rounded-full">
        </div>
      </header>

      <main class="flex-1 p-6">
        <div class="flex justify-between items-center mb-6">
          <h1 class="text-blue-900 text-2xl font-bold">Liste des Cargaisons</h1>
          <!-- Open the modal using ID.showModal() method -->
          <button class="bg-blue-600 text-white py-2 px-4 rounded mt-4" onclick="my_modal_1.showModal()">Ajouter une cargaison</button>
          <dialog id="my_modal_1" class="modal">
            <div class="modal-box w-full max-w-3xl p-6 bg-white rounded-lg shadow-lg">
              <div class="modal-action flex justify-between items-center">
                <h2 class="text-2xl font-bold mb-6 text-orange-600">Ajouter Cargaison</h2>
                <button class="btn btn-sm bg-red-500 text-white rounded-full p-2" onclick="document.getElementById('my_modal_1').close();">X</button>
              </div>
              <form id="form">
                <div class="grid grid-cols-2 gap-6">

                  <div>
                    <label for="type" class="block text-sm font-medium text-gray-700 mb-2">Type de cargaison</label>
                    <select id="type" class="w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500" onchange="updateDistance()">
                      <option value="maritime">Maritime</option>
                      <option value="aerien">Aérien</option>
                      <option value="routier">Routier</option>
                    </select>
                  </div>
                  <div>
                    <label for="selectLimite">Limitation Cargo</label>
                    <select name="" id="selectLimite">
                      <option value="poids">poids</option>
                      <option value="produit">produit</option>
                    </select>
                  </div>
                  <div id="poidsTotal">
                    <label for="poids" class="block text-sm font-medium text-gray-700 mb-2">Poids total</label>
                    <input type="number" id="poids" class="w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500" min="0">
                  </div>
                  <div id="produitTotal" class="hidden">
                    <label for="produit" class="block text-sm font-medium text-gray-700 mb-2">nombre de produit</label>
                    <input type="number" id="produit" class="w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500" min="0">
                  </div>
                  <div>
                    <label for="distance" class="block text-sm font-medium text-gray-700 mb-2">Distance totale</label>
                    <input type="number" id="distance" class="w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500" min="0" readonly>
                  </div>
                  <div>
                    <label for="datedepart" class="block text-sm font-medium text-gray-700 mb-2">Date de départ</label>
                    <input type="date" id="datedepart" class="w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  </div>
                  <div>
                    <label for="datearrivee" class="block text-sm font-medium text-gray-700 mb-2">Date d'arrivée</label>
                    <input type="date" id="datearrivee" class="w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  </div>
                  <div class="col-span-2">
                    <label for="location-search" class="block text-sm font-medium text-gray-700 mb-2">Rechercher un lieu</label>
                    <input type="text" id="location-search" class="w-full border border-gray-300 rounded-lg py-2 px-4 mb-2" placeholder="Rechercher un lieu">
                    <div id="map" class="w-full h-48 border border-gray-300 rounded-lg"></div>
                  </div>
                  <div>

                    <label for="departure-coordinates" class="block text-sm font-medium text-gray-700 mb-2">Lieu de départ</label>
                    <input type="text" id="departure-coordinates" name="departure-coordinates" class="w-full border border-gray-300 rounded-lg py-2 px-4 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500" readonly>
                  </div>
                  <div>
                    <label for="arrival-coordinates" class="block text-sm font-medium text-gray-700 mb-2">Lieu d'arrivée</label>
                    <input type="text" id="arrival-coordinates" name="arrival-coordinates" class="w-full border border-gray-300 rounded-lg py-2 px-4 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500" readonly>
                  </div>
                </div>
                <button type="submit" class="bg-blue-600 text-white py-2 px-4 rounded mt-6 focus:outline-none focus:ring-2 focus:ring-blue-500">Valider</button>
              </form>
            </div>
          </dialog>

        </div>


        <div class="grid grid-cols-9 mb-5">
  <div>
    <label for="code" class="block text-sm font-medium text-gray-700 mb-2">Code</label>
    <input type="text" id="code" name="code" class="w-40 border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500">
  </div>
  <div>
    <label for="departure-coordinates" class="block text-sm font-medium text-gray-700 mb-2">Lieu de départ</label>
    <input type="text" id="departure-coordinates" name="departure-coordinates" class="w-40 border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500" readonly>
  </div>
  <div>
    <label for="arrival-coordinates" class="block text-sm font-medium text-gray-700 mb-2">Lieu d'arrivée</label>
    <input type="text" id="arrival-coordinates" name="arrival-coordinates" class="w-40 border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500" readonly>
  </div>
  <div>
    <label for="datedepart" class="block text-sm font-medium text-gray-700 mb-2">Date de départ</label>
    <input type="date" id="datedepart" name="datedepart" class="w-40 border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500">
  </div>
  <div>
    <label for="datearrivee" class="block text-sm font-medium text-gray-700 mb-2">Date d'arrivée</label>
    <input type="date" id="datearrivee" name="datearrivee" class="w-40 border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500">
  </div>
  <div>
    <label for="type" class="block text-sm font-medium text-gray-700 mb-2">Type de cargaison</label>
    <select id="type" name="type" class="w-40 border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500">
      <option value="maritime">Maritime</option>
      <option value="aerien">Aérien</option>
      <option value="routier">Routier</option>
    </select>
  </div>
  <div>
    <label for="status" class="block text-sm font-medium text-gray-700 mb-2">Status</label>
    <select id="status" name="status" class="w-40 border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500">
      <option value="ouvert">Ouvert</option>
      <option value="fermer">Fermer</option>
    </select>
  </div>
  <div>
    <label for="etat" class="block text-sm font-medium text-gray-700 mb-2">Etat</label>
    <select id="etat" name="etat" class="w-40 border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500">
      <option value="attente">En attente</option>
      <option value="cours">En cours</option>
      <option value="terminer">Terminer</option>
    </select>
  </div>
  <div>
    <button type="button" id="filter-button" class="block text-sm font-medium mb-2 bg-blue-600 text-white py-2 px-4 rounded mt-7">Filtrer</button>
  </div>
</div>


        <div class="overflow-x-auto">
          <table class="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead>
              <tr class="bg-gray-200 text-left text-gray-600 uppercase text-sm leading-normal">
                <th class="py-3 px-4">Code</th>
                <th class="py-3 px-4">Lieu de départ</th>
                <th class="py-3 px-4">Lieu d'arrivée</th>
                <th class="py-3 px-4">Date de départ</th>
                <th class="py-3 px-4">Date d'arrivée</th>
                <th class="py-3 px-4">Distance</th>
                <th class="py-3 px-4">Type</th>
                <th class="py-3 px-4">Status</th>
                <th class="py-3 px-4">Etat</th>
                <th class="py-3 px-4">Actions</th>
                <th class="py-3 px-4">Produits</th>
              </tr>
            </thead>
            <tbody id="bodycargo" class="text-gray-600 text-sm font-light">

            </tbody>
          </table>
        </div>

        <!-- Pagination de la liste des cargaisons -->
        <div id="pagination" class="pagination"></div>

        <!-- Modal pour le bouton détails -->
        <dialog id="my_modal_2" class="details w-[80%] mx-auto bg-white p-8 rounded-lg shadow-lg">
          <div class="modal-box">
            <h2 class="text-2xl font-bold mb-6 text-blue-800">Détails Cargaison</h2>
            <form method="dialog">
              <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
            <div class="overflow-x-auto">
              <table class="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead>
                  <tr class="bg-gray-200 text-left text-gray-600 uppercase text-sm leading-normal">
                    <th class="py-3 px-4">Code</th>
                    <th class="py-3 px-4">Lieu de départ</th>
                    <th class="py-3 px-4">Lieu d'arrivée</th>
                    <th class="py-3 px-4">Date de départ</th>
                    <th class="py-3 px-4">Date d'arrivée</th>
                    <th class="py-3 px-4">Distance</th>
                    <th class="py-3 px-4">Type</th>
                    <th class="py-3 px-4">Status</th>
                    <th class="py-3 px-4">Etat</th>
                  </tr>
                </thead>
                <tbody id="bodydetailscargo" class="text-gray-600 text-sm font-light">
                  <tr class="border-b border-gray-200 hover:bg-gray-100">
                    
                    <td class="py-3 px-4">2</td>
                    <td class="py-3 px-4">
                      <button class="delete-btn">
                        <img src="../src/images/edit.png" alt="" class="h-6 w-6">
                      </button>
                    </td>
                  </tr>

                </tbody>
              </table>
            </div>

            <!-- Les produits de la cargaisons -->

            <div class="overflow-x-auto">
              <h2 class="text-2xl font-bold mb-6 text-blue-800">Liste des produits</h2>
              <table class="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead>
                  <tr class="bg-gray-200 text-left text-gray-600 uppercase text-sm leading-normal">
                    <th class="py-3 px-4">Code.P</th>
                    <!-- <th class="py-3 px-4">N.Produit</th> -->
                    <th class="py-3 px-4">T.Produit</th>
                    <th class="py-3 px-4">Poids</th>
                    <th class="py-3 px-4">N.Client</th>
                    <th class="py-3 px-4">P.Client</th>
                    <th class="py-3 px-4">Nu.Client</th>
                    <th class="py-3 px-4">A.Client</th>
                    <!-- <th class="py-3 px-4">C.Email</th> -->
                    <th class="py-3 px-4">N.Destinataire</th>
                    <th class="py-3 px-4">P.Destinataire</th>
                    <th class="py-3 px-4">Nu.Destinataire</th>
                    <th class="py-3 px-4">A.Destinataire</th>
                    <!-- <th class="py-3 px-4">D.Email</th> -->
                    <th class="py-3 px-4">Statut</th>
                  </tr>
                </thead>
                <tbody id="bodydetailsproduits" class="text-gray-600 text-sm font-light">

                </tbody>
              </table>
            </div>

          </div>
        </dialog>
        <!-- </div> -->

        <!-- Modal pour le bouton ajout -->
        <dialog id="my_modal_3" class="produit w-[80%] mx-auto bg-white p-8 rounded-lg shadow-lg">
          <div class="modal-box">
            <h2 class="text-2xl font-bold mb-6 text-blue-800">Ajouter un Produit</h2>
            <form method="dialog">
              <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
            <form id="forme">
              <!-- Informations sur le produit -->
              <fieldset class="mb-6">
                <legend class="text-xl font-semibold text-gray-700 mb-4">Informations sur le produit</legend>
                <div class="mb-4">
                  <label class="block text-gray-700">Nom du produit</label>
                  <input type="text" id="nomproduit" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Nom du produit">
                </div>
                <div class="mb-4">
                  <label class="block text-gray-700">Type de produit</label>
                  <select id="typeproduit" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400">
                    <option value="">Sélectionner le type</option>
                    <option value="materiels">Matériels</option>
                    <option value="alimentaires">Alimentaires</option>
                    <option value="chimique">Chimique</option>
                  </select>
                </div>
                <div class="mb-4">
                  <label class="block text-gray-700">Poids</label>
                  <input id="poids" type="number" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Poids">
                </div>
              </fieldset>

              <!-- Informations sur le client -->
              <fieldset class="mb-6">
                <legend class="text-xl font-semibold text-gray-700 mb-4">Informations sur le client</legend>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label class="block text-gray-700">Nom du client</label>
                    <input id="nomclient" type="text" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Nom du client">
                  </div>
                  <div>
                    <label class="block text-gray-700">Prénom du client</label>
                    <input id="prenomclient" type="text" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Prénom du client">
                  </div>
                </div>
                <div class="mb-4">
                  <label class="block text-gray-700">Numéro de téléphone</label>
                  <input id="numclient" type="tel" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Numéro de téléphone">
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label class="block text-gray-700">Adresse</label>
                    <input id="adressclient" type="text" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Adresse">
                  </div>
                  <div>
                    <label class="block text-gray-700">Email</label>
                    <input id="emailclient" type="email" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Email">
                  </div>
                </div>
              </fieldset>

              <!-- Informations sur le destinataire -->
              <fieldset class="mb-6">
                <legend class="text-xl font-semibold text-gray-700 mb-4">Informations sur le destinataire</legend>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label class="block text-gray-700">Nom</label>
                    <input id="nomdestinataire" type="text" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Nom">
                  </div>
                  <div>
                    <label class="block text-gray-700">Prénom</label>
                    <input id="prenomdestinataire" type="text" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Prénom">
                  </div>
                </div>
                <div class="mb-4">
                  <label class="block text-gray-700">Numéro de téléphone</label>
                  <input id="numdestinataire" type="tel" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Numéro de téléphone">
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label class="block text-gray-700">Adresse</label>
                    <input id="adressdestinataire" type="text" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Adresse">
                  </div>
                  <div>
                    <label class="block text-gray-700">Email</label>
                    <input id="emaildestinataire" type="email" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Email">
                  </div>
                </div>
              </fieldset>
              <!-- Bouton Enregistrer -->
              <div class="text-right">
                <button id="butonAdd" type="button" class="px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">Enregistrer</button>
              </div>
            </form>
          </div>
        </dialog>
        <!-- </div> -->

      </main>
      <footer class="bg-blue-900 text-white text-center py-6">
        <p class="text-2xl">@gp_monde</p>
      </footer>
    </div>
  </div>
  <script src="../dist/test.js" type="module"></script>
  <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
  <!-- <script type="module" src="../dist/validation.js"></script> -->



  <script>
    // Initialize the map
    var map = L.map('map').setView([51.505, -0.09], 13);

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Add markers and event listeners for map clicks
    var departureMarker = L.marker([51.505, -0.09]).addTo(map);
    var arrivalMarker = L.marker([51.505, -0.09]).addTo(map);

    var departureCoords, arrivalCoords;
    var activeInput = 'departure'; // Keeps track of which input is active

    map.on('click', function(e) {
      var coords = e.latlng;
      if (activeInput === 'departure') {
        departureMarker.setLatLng(coords);
        departureCoords = coords;
        reverseGeocode(coords, 'departure-coordinates');
      } else {
        arrivalMarker.setLatLng(coords);
        arrivalCoords = coords;
        reverseGeocode(coords, 'arrival-coordinates');
      }
      updateDistance();
    });

    // Function to reverse geocode coordinates to place name
    function reverseGeocode(coords, inputId) {
      var url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${coords.lat}&lon=${coords.lng}`;

      fetch(url)
        .then(response => response.json())
        .then(data => {
          document.getElementById(inputId).value = data.display_name;
        })
        .catch(error => {
          console.error('Error during reverse geocoding:', error);
        });
    }

    // Function to calculate distance between two coordinates
    function calculateDistance(lat1, lon1, lat2, lon2) {
      var R = 6371; // Radius of the Earth in km
      var dLat = (lat2 - lat1) * Math.PI / 180;
      var dLon = (lon2 - lon1) * Math.PI / 180;
      var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      var distance = R * c; // Distance in km
      return distance;
    }

    // Function to update the distance input field
    function updateDistance() {
      if (departureCoords && arrivalCoords) {
        var baseDistance = calculateDistance(departureCoords.lat, departureCoords.lng, arrivalCoords.lat, arrivalCoords.lng);
        var transportType = document.getElementById('type').value;

        var adjustedDistance;
        switch (transportType) {
          case 'maritime':
            adjustedDistance = baseDistance * 1.1; // Example adjustment for maritime
            break;
          case 'aerien':
            adjustedDistance = baseDistance * 0.9; // Example adjustment for aerien
            break;
          case 'routier':
            adjustedDistance = baseDistance * 1.2; // Example adjustment for routier
            break;
          default:
            adjustedDistance = baseDistance;
        }

        document.getElementById('distance').value = adjustedDistance.toFixed(2);
      }
    }

    // Add search functionality
    document.getElementById('location-search').addEventListener('keydown', function(event) {
      if (event.key === 'Enter') {
        event.preventDefault(); // Prevent form submission
        searchLocation(event.target.value);
      }
    });

    function searchLocation(query) {
      var url = `https://nominatim.openstreetmap.org/search?format=json&q=${query}`;

      fetch(url)
        .then(response => response.json())
        .then(data => {
          if (data.length > 0) {
            var result = data[0];
            var coords = [result.lat, result.lon];
            map.setView(coords, 13);

            if (activeInput === 'departure') {
              departureMarker.setLatLng(coords);
              departureCoords = {
                lat: result.lat,
                lng: result.lon
              };
              document.getElementById('departure-coordinates').value = result.display_name;
            } else {
              arrivalMarker.setLatLng(coords);
              arrivalCoords = {
                lat: result.lat,
                lng: result.lon
              };
              document.getElementById('arrival-coordinates').value = result.display_name;
            }

            updateDistance();
          } else {
            alert('Lieu non trouvé');
          }
        })
        .catch(error => {
          console.error('Error during search:', error);
        });
    }

    // Set active input based on user click
    document.getElementById('departure-coordinates').addEventListener('focus', function() {
      activeInput = 'departure';
    });

    document.getElementById('arrival-coordinates').addEventListener('focus', function() {
      activeInput = 'arrival';
    });


    // Récupération du formulaire et de ses champs
    const form = document.getElementById('form');

    const typeInput = document.getElementById('type');
    const poidsInput = document.getElementById('poids');
    const distanceInput = document.getElementById('distance');
    const dateDepartInput = document.getElementById('datedepart');
    const dateArriveeInput = document.getElementById('datearrivee');
    const codeInput = document.getElementById('code');
    /* const statusInput = document.getElementById('status'); */

    // Ajout d'un écouteur d'événement sur la soumission du formulaire
    form.addEventListener('submit', (event) => {
      event.preventDefault(); // Empêche la soumission par défaut du formulaire

      // Réinitialisation des messages d'erreur
      clearErrors();

      // Validation des champs
      let isValid = true;


      if (typeInput.value.trim() === '') {
        setError(typeInput, 'Le type de cargaison est obligatoire.');
        isValid = false;
      }

      if (poidsInput.value.trim() === '' || poidsInput.value < 0) {
        setError(poidsInput, 'Le poids total doit être un nombre positif.');
        isValid = false;
      }

      if (distanceInput.value.trim() === '' || distanceInput.value < 0) {
        setError(distanceInput, 'La distance totale doit être un nombre positif.');
        isValid = false;
      }

      if (dateDepartInput.value.trim() === '') {
        setError(dateDepartInput, 'La date de départ est obligatoire.');
        isValid = false;
      }

      if (dateArriveeInput.value.trim() === '') {
        setError(dateArriveeInput, 'La date d\'arrivée est obligatoire.');
        isValid = false;
      }

      if (codeInput.value.trim() === '' || isNaN(codeInput.value)) {
        setError(codeInput, 'Le code doit être un nombre.');
        isValid = false;
      }

      /*  if (statusInput.value.trim() === '') {
         setError(statusInput, 'Le statut est obligatoire.');
         isValid = false;
       } */

      // Si le formulaire est valide, vous pouvez soumettre les données
      if (isValid) {
        // Soumission du formulaire
        form.submit();
      }
    });

    // Fonction pour afficher un message d'erreur
    function setError(input, message) {
      const formControl = input.parentElement;
      const errorElement = formControl.querySelector('.error');

      if (errorElement) {
        errorElement.textContent = message;
      } else {
        const errorDiv = document.createElement('div');
        errorDiv.classList.add('error', 'text-red-500', 'mt-1');
        errorDiv.textContent = message;
        formControl.appendChild(errorDiv);
      }

      input.classList.add('border-red-500');
    }

    // Fonction pour supprimer les messages d'erreur
    function clearErrors() {
      const errorElements = document.querySelectorAll('.error');
      errorElements.forEach((error) => {
        error.remove();
      });

      const inputElements = document.querySelectorAll('input');
      inputElements.forEach((input) => {
        input.classList.remove('border-red-500');
      });
    }


    // Récupération des valeurs du formulaire

    const type = typeInput.value.trim();
    const poids = parseFloat(poidsInput.value.trim());
    const distance = parseFloat(distanceInput.value.trim());
    const dateDepartPrevue = dateDepartInput.value.trim();
    const dateArriveePrevue = dateArriveeInput.value.trim();
    const lieuDepart = document.getElementById('departure-coordinates').value.trim();
    const lieuArrivee = document.getElementById('arrival-coordinates').value.trim();
    const coordonneesDepart = departureCoords;
    const coordonneesArrivee = arrivalCoords;
    const code = parseInt(codeInput.value.trim());
    /* const status = statusInput.value.trim(); */

  </script>
</body>
</html>