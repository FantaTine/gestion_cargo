var _a, _b;
/* import {Aerienne} from './model/aerienne.js';
import {Maritime} from './model/maritime.js';
import {Routiere} from './model/routiere.js'; */
import { Cargaison } from './model/cargaison.js';
import { Produit } from './model/produit.js';
let cargo = [];
(_a = document.getElementById('form')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', (event) => {
    event.preventDefault();
    const errorElements = document.querySelectorAll('.text-red-500');
    errorElements.forEach(el => el.textContent = '');
    const typeCargaison = document.getElementById('type').value;
    const distance = parseFloat(document.getElementById('distance').value);
    const numero = "FN" + Math.floor(Math.random() * 1000); // Générer un numéro aléatoire pour la cargaison
    const poidsCargaison = parseFloat(document.getElementById('poids').value);
    const pointDepart = document.getElementById('departure-coordinates').value;
    const pointArrive = document.getElementById('arrival-coordinates').value;
    const dateDepart = document.getElementById('datedepart').value;
    const dateArrive = document.getElementById('datearrivee').value;
    const cargaison = new Cargaison("ajoutcargaison", numero, typeCargaison, poidsCargaison, distance, dateDepart, dateArrive, pointDepart, pointArrive, "En attente", "Ouvert", []);
    console.log(cargaison);
    fetch("enregistrer_cargaison.php", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cargaison.getInfo()),
    })
        .then(response => response.json())
        .then(data => {
        console.log(data);
        afficherCargaisons();
        console.log(cargo);
    })
        .catch(error => console.error('Error:', error));
    return false;
});
const selectedLimit = document.getElementById('selectLimite');
selectedLimit.addEventListener('change', function (e) {
    var _a, _b, _c, _d;
    if (selectedLimit.value == "poids") {
        (_a = document.getElementById('produitTotal')) === null || _a === void 0 ? void 0 : _a.classList.add("hidden");
        (_b = document.getElementById('poidsTotal')) === null || _b === void 0 ? void 0 : _b.classList.remove("hidden");
    }
    if (selectedLimit.value == "produit") {
        (_c = document.getElementById('poidsTotal')) === null || _c === void 0 ? void 0 : _c.classList.add("hidden");
        (_d = document.getElementById('produitTotal')) === null || _d === void 0 ? void 0 : _d.classList.remove("hidden");
    }
});
var id;
console.log(cargo);
// Pagination de la liste des cargaisons
let currentPage = 1;
const itemsPerPage = 5;
function createPagination(totalItems, itemsPerPage) {
    const paginationElement = document.getElementById('pagination');
    if (!paginationElement)
        return;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    paginationElement.innerHTML = '';
    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.innerText = i.toString();
        button.classList.add('pagination-button');
        button.addEventListener('click', () => {
            currentPage = i;
            afficherCargaisons();
        });
        paginationElement.appendChild(button);
    }
}
// Affichage de la liste des cargaisons
function afficherCargaisons() {
    fetch('enregistrer_cargaison.php')
        .then(response => response.json())
        .then(data => {
        const cargaisons = data.cargaisons;
        cargo = [...cargaisons];
        const cargaisonList = document.getElementById('bodycargo');
        if (!cargaisonList)
            return;
        cargaisonList.innerHTML = '';
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const paginatedCargaisons = cargaisons.slice(start, end);
        paginatedCargaisons.forEach(cargaison => {
            const row = document.createElement('tr');
            row.innerHTML = `
            <td class="px-6 py-4 ">${cargaison.code}</td>
            <td class="px-6 py-4 ">${cargaison.lieuDepart}</td>
            <td class="px-6 py-4 ">${cargaison.lieuArrivee}</td>
            <td class="px-6 py-4 ">${cargaison.dateDepartPrevue}</td>
            <td class="px-6 py-4 ">${cargaison.dateArriveePrevue}</td>
            <td class="px-6 py-4 ">${cargaison.distance}</td>
            <td class="px-6 py-4 text-blue-900">${cargaison.type}</td>
            <td class="px-6 py-4 text-green-500">${cargaison.status}</td>
            <td class="px-6 py-4 text-yellow-500">${cargaison.etat}</td>
            <td class="px-6 py-4 "><button class="bg-blue-500 text-white h-10 px-5 py-1 rounded btn-view"  type="button" data-id="${cargaison.code}">Details</button></td>
            <td class="px-6 py-4 " ><button  class="bg-yellow-500 text-white h-10 px-5 py-1 rounded btn-ajt" data-id="${cargaison.code}"  type="button" >Ajouter</button></td>
          `;
            cargaisonList.appendChild(row);
            console.log(cargaison.code);
        });
        createPagination(cargaisons.length, itemsPerPage);
        document.addEventListener('click', (event) => {
            const target = event.target;
            if (target.classList.contains('btn-ajt')) {
                id = target.getAttribute('data-id');
                console.log(id);
                const my_modal_3 = document.getElementById('my_modal_3');
                if (id) {
                    my_modal_3.showModal();
                }
            }
        });
        document.addEventListener('click', (event) => {
            const target = event.target;
            if (target.classList.contains('btn-view')) {
                id = target.getAttribute('data-id');
                console.log(id);
                const my_modal_2 = document.getElementById('my_modal_2');
                if (id) {
                    my_modal_2.showModal();
                    afficherDetailsCargaisons(id);
                }
            }
            const ids = document.querySelectorAll('.statutproduit');
            console.log(ids);
            ids.forEach(id => {
                id.addEventListener('change', function (event) {
                    const target = event.target;
                    console.log(target === null || target === void 0 ? void 0 : target.value);
                    const idproduit = id.getAttribute('id');
                    changerstatpro({ id: idproduit, status: target.value, action: 'changeStatutProduit' });
                });
            });
        });
    })
        .catch(error => console.error('Error:', error));
}
afficherCargaisons();
(_b = document.getElementById('butonAdd')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', function (event) {
    event.preventDefault();
    const codepro = "P" + Math.floor(Math.random() * 1000);
    const nomproduit = document.getElementById('nomproduit').value;
    const typeproduit = document.getElementById('typeproduit').value;
    const poids = parseFloat(document.getElementById("poids").value);
    const nomclient = document.getElementById('nomclient').value;
    const prenomclient = document.getElementById('prenomclient').value;
    const numclient = parseFloat(document.getElementById("numclient").value);
    const adressclient = document.getElementById('adressclient').value;
    const emailclient = document.getElementById('emailclient').value;
    const nomdestinataire = document.getElementById('nomdestinataire').value;
    const prenomdestinataire = document.getElementById('prenomdestinataire').value;
    const numdestinataire = parseFloat(document.getElementById("numdestinataire").value);
    const adressdestinataire = document.getElementById('adressdestinataire').value;
    const emaildestinataire = document.getElementById('emaildestinataire').value;
    const produit = new Produit("ajoutproduit", codepro, nomproduit, typeproduit, poids, nomclient, prenomclient, numclient, adressclient, emailclient, nomdestinataire, prenomdestinataire, numdestinataire, adressdestinataire, id, emaildestinataire, "Disponible");
    envoyerversjson(produit);
});
console.log("simple");
function envoyerversjson(objet) {
    fetch("enregistrer_cargaison.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(objet),
    })
        .then(response => response.json())
        .then(result => {
        if (result.status === 'success') {
            const my_modal_3 = document.getElementById('my_modal_3');
            my_modal_3.close();
            //   Swal.fire({
            //     title: "Succès",
            //     text: "Produit enregisré avec succès",
            //     icon: "success",
            //     showConfirmButton: false,
            //     timer: 3000
            //   });
            // }else{
            //   Swal.fire({
            //     title: "Erreur",
            //     text: "Produit non enregisré",
            //     icon: "error",
            //     showConfirmButton: false,
            //     timer: 3000
            //   });
        }
    });
}
// Fonction pour afficher les détails d'une cargaison
function afficherDetailsCargaisons(id) {
    fetch('enregistrer_cargaison.php')
        .then(response => response.json())
        .then(data => {
        const cargaisons = data.cargaisons;
        const cargaison = cargaisons.find(cargaison => cargaison.code === id);
        cargo = [...cargaisons];
        console.log(cargaisons);
        const cargaisonList = document.getElementById('bodydetailscargo');
        if (!cargaisonList)
            return;
        cargaisonList.innerHTML = '';
        const row = document.createElement('tr');
        row.innerHTML = `
          <td class="px-6 py-4 ">${cargaison === null || cargaison === void 0 ? void 0 : cargaison.code}</td>
          <td class="px-6 py-4 ">${cargaison === null || cargaison === void 0 ? void 0 : cargaison.lieuDepart}</td>
          <td class="px-6 py-4 ">${cargaison === null || cargaison === void 0 ? void 0 : cargaison.lieuArrivee}</td>
          <td class="px-6 py-4 ">${cargaison === null || cargaison === void 0 ? void 0 : cargaison.dateDepartPrevue}</td>
          <td class="px-6 py-4 ">${cargaison === null || cargaison === void 0 ? void 0 : cargaison.dateArriveePrevue}</td>
          <td class="px-6 py-4 ">${cargaison === null || cargaison === void 0 ? void 0 : cargaison.distance}</td>
          <td class="px-6 py-4 text-blue-900">${cargaison === null || cargaison === void 0 ? void 0 : cargaison.type}</td>
          <td class="py-3 px-4 text-green-500 select select-bordered select-sm">
          <select class="select rounded shadow-lg select-bordered select-sm w-full max-w-xs statuscargo" data-id="${cargaison === null || cargaison === void 0 ? void 0 : cargaison.code}">
            <option value="Ouvert" ${(cargaison === null || cargaison === void 0 ? void 0 : cargaison.status) === 'Ouvert' ? 'selected' : ''}>Ouvert</option>
            <option value="Fermer" ${(cargaison === null || cargaison === void 0 ? void 0 : cargaison.status) === 'Fermer' ? 'selected' : ''}>Fermer</option>
          </select>
        </td>
        <td class="py-3 px-4 text-red-500">
        <select class="select rounded shadow-lg select-bordered select-sm w-full max-w-xs etatcargo" data-id="${cargaison === null || cargaison === void 0 ? void 0 : cargaison.code}">
            <option value="En attente" ${(cargaison === null || cargaison === void 0 ? void 0 : cargaison.etat) === 'En attente' ? 'selected' : ''}>En attente</option>
            <option value="En cours" ${(cargaison === null || cargaison === void 0 ? void 0 : cargaison.etat) === 'En cours' ? 'selected' : ''}>En cours</option>
            <option value="Terminé" ${(cargaison === null || cargaison === void 0 ? void 0 : cargaison.etat) === 'Terminé' ? 'selected' : ''}>Terminé</option>
          </select>
        </td>
        `;
        cargaisonList.appendChild(row);
        console.log(cargaison);
        document.querySelectorAll('.statuscargo').forEach(sel => {
            sel.addEventListener('change', (event) => {
                const select = event.target;
                const status = select.value;
                const id = select.getAttribute("data-id");
                console.log(cargaison === null || cargaison === void 0 ? void 0 : cargaison.code, status);
                changeretat({ id: id, status: status, action: "changeEtat" });
                // envoyerversjson(cargaison);
            });
        });
        document.querySelectorAll('.etatcargo').forEach(sel => {
            sel.addEventListener('change', (event) => {
                const select = event.target;
                const etat = select.value;
                const id = select.getAttribute("data-id");
                console.log(cargaison === null || cargaison === void 0 ? void 0 : cargaison.code, etat);
                changerstatus({ idp: id, etat: etat, action: "changeStatus" });
                // envoyerversjson(cargaison);
            });
        });
        const produitList = document.getElementById('bodydetailsproduits');
        if (!produitList)
            return;
        produitList.innerHTML = '';
        cargaison === null || cargaison === void 0 ? void 0 : cargaison.produits.forEach((produit) => {
            const row1 = document.createElement('tr');
            row1.innerHTML = `
        <td class="px-6 py-4 ">${produit === null || produit === void 0 ? void 0 : produit.codepro}</td>
        <td class="px-6 py-4 ">${produit === null || produit === void 0 ? void 0 : produit.typeproduit}</td>
        <td class="px-6 py-4 ">${produit === null || produit === void 0 ? void 0 : produit.poids}</td>
        <td class="px-6 py-4 ">${produit === null || produit === void 0 ? void 0 : produit.nomclient}</td>
        <td class="px-6 py-4 ">${produit === null || produit === void 0 ? void 0 : produit.prenomclient}</td>
        <td class="px-6 py-4 ">${produit === null || produit === void 0 ? void 0 : produit.numclient}</td>
        <td class="px-6 py-4 ">${produit === null || produit === void 0 ? void 0 : produit.adressclient}</td>
        <td class="px-6 py-4">${produit === null || produit === void 0 ? void 0 : produit.nomdestinataire}</td>
        <td class="px-6 py-4 ">${produit === null || produit === void 0 ? void 0 : produit.prenomdestinataire}</td>
        <td class="px-6 py-4 ">${produit === null || produit === void 0 ? void 0 : produit.numdestinataire}</td>
        <td class="px-6 py-4">${produit === null || produit === void 0 ? void 0 : produit.adressdestinataire}</td>
        <td class="py-3 px-4 text-blue-500">
        <select class="select rounded shadow-lg select-bordered select-sm w-full max-w-xs statutproduit" data-id="${produit === null || produit === void 0 ? void 0 : produit.Statut}" id="${produit.codepro}">
            <option value="Disponible" ${(produit === null || produit === void 0 ? void 0 : produit.statut) === 'Disponible' ? 'selected' : ''}>Disponible</option>
            <option value="Recuperer" ${(produit === null || produit === void 0 ? void 0 : produit.statut) === 'Recuperer' ? 'selected' : ''}>Recuperer</option>
            <option value="Perdu" ${(produit === null || produit === void 0 ? void 0 : produit.statut) === 'Perdu' ? 'selected' : ''}>Perdu</option>
            <option value="Archiver" ${(produit === null || produit === void 0 ? void 0 : produit.statut) === 'Archiver' ? 'selected' : ''}>Archiver</option>
            <option value="Arriver" ${(produit === null || produit === void 0 ? void 0 : produit.statut) === 'Arriver' ? 'selected' : ''}>Arriver</option>
          </select>
        </td>
        `;
            produitList.appendChild(row1);
            //changer etat produit à mettre ici
            // document.querySelectorAll('.statutproduit').forEach(sel => {
            //   sel.addEventListener('change', (event) => {
            //     const select = event.target as HTMLSelectElement;
            //     const status = select.value;
            //     const id = select.getAttribute("data-id");
            //       console.log(produit?.codepro, status);
            //       changerstatpro({id:id, status: status, action: "changeStatutProduit"});
            //   });
            // })
        });
    });
}
function changeretat(objet) {
    envoyerversjson(objet);
    afficherCargaisons();
}
function changerstatus(objet) {
    envoyerversjson(objet);
    afficherCargaisons();
}
function changerstatpro(objet) {
    envoyerversjson(objet);
    // afficherCargaisons();
}
