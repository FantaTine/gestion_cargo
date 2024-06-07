<!DOCTYPE html>
<html lang="fr">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
  <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
  <link href="./output.css" rel="stylesheet">
  <title>Produits </title>
  <style>
    body {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }

    main {
      flex: 1;
    }
  </style>
</head>

<body class="bg-gray-100 p-2">
  <div class="flex flex-1 gap-4">
    <!-- Sidebar -->
    <aside class="w-64 bg-white shadow-lg h-screen flex flex-col rounded-r-3xl border border-solid border-#122083">
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

      <div class="flex-1 flex flex-col">
      <main class="flex-1 p-6">
        <div class="flex justify-between items-center mb-6">
          <h1 class="text-blue-900 text-2xl font-bold">Produits / Colis</h1>
        </div>
        <div class="max-w-full mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 class="text-2xl font-bold mb-6 text-blue-800">Ajouter un Produit</h2>
        <form>
            <!-- Informations sur le produit -->
            <fieldset class="mb-6">
                <legend class="text-xl font-semibold text-gray-700 mb-4">Informations sur le produit</legend>
                <div class="mb-4">
                    <label class="block text-gray-700">Nom du produit</label>
                    <input type="text" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Nom du produit">
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700">Type de produit</label>
                    <select class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400">
                        <option value="">Sélectionner le type</option>
                        <option value="materiels">Matériels</option>
                        <option value="alimentaires">Alimentaires</option>
                        <option value="chimique">Chimique</option>
                    </select>
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700">Poids</label>
                    <input type="text" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Poids">
                </div>
            </fieldset>

            <!-- Informations sur le client -->
            <fieldset class="mb-6">
                <legend class="text-xl font-semibold text-gray-700 mb-4">Informations sur le client</legend>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label class="block text-gray-700">Nom du client</label>
                        <input type="text" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Nom du client">
                    </div>
                    <div>
                        <label class="block text-gray-700">Prénom du client</label>
                        <input type="text" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Prénom du client">
                    </div>
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700">Numéro de téléphone</label>
                    <input type="tel" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Numéro de téléphone">
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700">Adresse</label>
                    <input type="text" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Adresse">
                </div>
            </fieldset>

            <!-- Informations sur le destinataire -->
            <fieldset class="mb-6">
                <legend class="text-xl font-semibold text-gray-700 mb-4">Informations sur le destinataire</legend>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label class="block text-gray-700">Nom</label>
                        <input type="text" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Nom">
                    </div>
                    <div>
                        <label class="block text-gray-700">Prénom</label>
                        <input type="text" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Prénom">
                    </div>
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700">Numéro de téléphone</label>
                    <input type="tel" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Numéro de téléphone">
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700">Adresse</label>
                    <input type="text" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Adresse">
                </div>
            </fieldset>

            <!-- Bouton Enregistrer -->
            <div class="text-right">
                <button type="submit" class="px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">Enregistrer</button>
            </div>
        </form>
    </div>
        </main> 
        
      <footer class="bg-blue-900 text-white text-center py-6">
        <p class="text-2xl">@gp_monde</p>
      </footer>
      </div>

      

</body>

</html>