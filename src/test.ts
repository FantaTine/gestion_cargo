/* import {Aerienne} from './model/aerienne.js';
import {Maritime} from './model/maritime.js';
import {Routiere} from './model/routiere.js'; */
import { Cargaison } from './model/cargaison.js';
import { Produit } from './model/produit.js';

let cargo: Cargaison[] = [];
document.getElementById('form')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const errorElements = document.querySelectorAll('.text-red-500');
  errorElements.forEach(el => el.textContent = '');
  const typeCargaison: string = (document.getElementById('type') as HTMLSelectElement).value;
  const distance: number = parseFloat((document.getElementById('distance') as HTMLInputElement).value);
  const numero: string = "FN" + Math.floor(Math.random() * 1000);  // Générer un numéro aléatoire pour la cargaison
  const poidsCargaison: number = parseFloat((document.getElementById('poids') as HTMLInputElement).value);
  const pointDepart: string = (document.getElementById('departure-coordinates') as HTMLInputElement).value;
  const pointArrive: string = (document.getElementById('arrival-coordinates') as HTMLInputElement).value;
  const dateDepart: string = (document.getElementById('datedepart') as HTMLInputElement).value;
  const dateArrive: string = (document.getElementById('datearrivee') as HTMLInputElement).value;

  const cargaison = new Cargaison(
    "ajoutcargaison",
    numero,
    typeCargaison,
    poidsCargaison,
    distance,
    dateDepart,
    dateArrive,
    pointDepart,
    pointArrive,
    "En attente",
    "Ouvert",
    []
  )


  fetch("enregistrer_cargaison.php", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(cargaison.getInfo()),
  })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      afficherCargaisons()
      console.log(cargo)
    })
    .catch(error => console.error('Error:', error));
  return false;


});

const selectedLimit = document.getElementById('selectLimite') as HTMLSelectElement;
selectedLimit.addEventListener('change', function (e) {

  if (selectedLimit.value == "poids") {
    document.getElementById('produitTotal')?.classList.add("hidden");
    document.getElementById('poidsTotal')?.classList.remove("hidden");

  }
  if (selectedLimit.value == "produit") {
    document.getElementById('poidsTotal')?.classList.add("hidden");
    document.getElementById('produitTotal')?.classList.remove("hidden");

  }
})
var id: string | null

console.log(cargo)

// Pagination de la liste des cargaisons

let currentPage = 1;
const itemsPerPage = 5;
function createPagination(totalItems: number, itemsPerPage: number): void {
  const paginationElement = document.getElementById('pagination');
  if (!paginationElement) return;
  
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
function afficherCargaisons(): void {
  fetch('enregistrer_cargaison.php')
    .then(response => response.json())
    .then(data => {
      const cargaisons: Cargaison[] = data.cargaisons;
      cargo = [...cargaisons];
      const cargaisonList = document.getElementById('bodycargo');

      if (!cargaisonList) return;
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
      
      });

      createPagination(cargaisons.length, itemsPerPage);

      document.addEventListener('click', (event) => {
        const target = event.target as HTMLElement;
        if (target.classList.contains('btn-ajt')) {
          id = target.getAttribute('data-id');
       
          const my_modal_3 = document.getElementById('my_modal_3') as HTMLDialogElement;
          if (id) {
            my_modal_3!.showModal();
          }
        }
      });

      document.addEventListener('click', (event) => {
        const target = event.target as HTMLElement;
        if (target.classList.contains('btn-view')) {
          id = target.getAttribute('data-id');
        
          const my_modal_2 = document.getElementById('my_modal_2') as HTMLDialogElement;
          if (id) {
            my_modal_2!.showModal();
            afficherDetailsCargaisons(id);
          }
        }

        const ids = document.querySelectorAll('.statutproduit')!;
      
        ids.forEach(id => {
          id.addEventListener('change', function (event) {
            const target = event.target as HTMLInputElement;
            
            const idproduit = id.getAttribute('id');
            changerstatpro({id: idproduit, status: target.value, action: 'changeStatutProduit'});
          });
        });
      });
    })
    .catch(error => console.error('Error:', error));
}

afficherCargaisons();


document.getElementById('butonAdd')?.addEventListener('click', function (event) {

  event.preventDefault();
  const codepro : string ="P" + Math.floor(Math.random() * 1000);
  const nomproduit = (document.getElementById('nomproduit') as HTMLInputElement).value;
  const typeproduit = (document.getElementById('typeproduit') as HTMLInputElement).value;
  const poids = parseFloat((document.getElementById("poids") as HTMLInputElement).value);
  const nomclient = (document.getElementById('nomclient') as HTMLInputElement).value;
  const prenomclient = (document.getElementById('prenomclient') as HTMLInputElement).value;
  const numclient = parseFloat((document.getElementById("numclient") as HTMLInputElement).value);
  const adressclient = (document.getElementById('adressclient') as HTMLInputElement).value;
  const emailclient = (document.getElementById('emailclient') as HTMLInputElement).value;
  const nomdestinataire = (document.getElementById('nomdestinataire') as HTMLInputElement).value;
  const prenomdestinataire = (document.getElementById('prenomdestinataire') as HTMLInputElement).value;
  const numdestinataire = parseFloat((document.getElementById("numdestinataire") as HTMLInputElement).value);
  const adressdestinataire = (document.getElementById('adressdestinataire') as HTMLInputElement).value;
  const emaildestinataire = (document.getElementById('emaildestinataire') as HTMLInputElement).value;
  

  const produit = new Produit(
    "ajoutproduit",
    codepro,
    nomproduit,
    typeproduit,
    poids,
    nomclient,
    prenomclient,
    numclient,
    adressclient,
    emailclient,
    nomdestinataire,
    prenomdestinataire,
    numdestinataire,
    adressdestinataire,
    id,
    emaildestinataire,
    "Disponible"
  )
 
envoyerversjson(produit);

});


function envoyerversjson(objet: any){
  fetch("enregistrer_cargaison.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(objet),
  })
    .then(response => response.json())
    .then(result => {

      console.log(result);
      if(result.status === 'success'){
        
        const my_modal_3 = document.getElementById('my_modal_3') as HTMLDialogElement;
        my_modal_3!.close();
       gestionAlert(result.status, result.message);
      }else{
        gestionAlert(result.status, result.message);
      }
    })
  }

// Fonction pour afficher les détails d'une cargaison
function afficherDetailsCargaisons(id?:string | null ): void {
  fetch('enregistrer_cargaison.php')
    .then(response => response.json())
    .then(data => {
      const cargaisons: Cargaison[] = data.cargaisons;

      const cargaison = cargaisons.find(cargaison => cargaison.code === id);

      cargo = [...cargaisons];
     
      
      const cargaisonList = document.getElementById('bodydetailscargo');
     

      if (!cargaisonList) return;
      cargaisonList.innerHTML = '';
      
        const row = document.createElement('tr');
        row.innerHTML = `
          <td class="px-6 py-4 ">${cargaison?.code}</td>
          <td class="px-6 py-4 ">${cargaison?.lieuDepart}</td>
          <td class="px-6 py-4 ">${cargaison?.lieuArrivee}</td>
          <td class="px-6 py-4 ">${cargaison?.dateDepartPrevue}</td>
          <td class="px-6 py-4 ">${cargaison?.dateArriveePrevue}</td>
          <td class="px-6 py-4 ">${cargaison?.distance}</td>
          <td class="px-6 py-4 text-blue-900">${cargaison?.type}</td>
          <td class="py-3 px-4 text-green-500 select select-bordered select-sm">
          <select class="select rounded shadow-lg select-bordered select-sm w-full max-w-xs statuscargo" data-id="${cargaison?.code}">
            <option value="Ouvert" ${cargaison?.status === 'Ouvert' ? 'selected' : ''}>Ouvert</option>
            <option value="Fermer" ${cargaison?.status === 'Fermer' ? 'selected' : ''}>Fermer</option>
          </select>
        </td>
        <td class="py-3 px-4 text-red-500">
        <select class="select rounded shadow-lg select-bordered select-sm w-full max-w-xs etatcargo" data-id="${cargaison?.code}">
            <option value="En attente" ${cargaison?.etat === 'En attente' ? 'selected' : ''}>En attente</option>
            <option value="En cours" ${cargaison?.etat === 'En cours' ? 'selected' : ''}>En cours</option>
            <option value="Terminé" ${cargaison?.etat === 'Terminé' ? 'selected' : ''}>Terminé</option>
          </select>
        </td>
        `;
        cargaisonList.appendChild(row);
        console.log(cargaison);

    document.querySelectorAll('.statuscargo').forEach(sel => {
      sel.addEventListener('change', (event) => {
        const select = event.target as HTMLSelectElement;
        const status = select.value;
        const id = select.getAttribute("data-id");
          console.log(cargaison?.code, status);
          changeretat({id:id, status: status, action: "changeEtat"});
          // envoyerversjson(cargaison);
        
      });
    })

    document.querySelectorAll('.etatcargo').forEach(sel => {
      sel.addEventListener('change', (event) => {
        const select = event.target as HTMLSelectElement;
        const etat = select.value;
        const id = select.getAttribute("data-id");
         
          changerstatus({idp:id, etat: etat, action: "changeStatus"});
          // envoyerversjson(cargaison);
        
      });

    })

      const produitList = document.getElementById('bodydetailsproduits');

      if (!produitList) return;

      produitList.innerHTML = '';
      
      cargaison?.produits.forEach((produit:any) => {
        const row1 = document.createElement('tr');
        row1.innerHTML = `
        <td class="px-6 py-4 ">${produit?.codepro}</td>
        <td class="px-6 py-4 ">${produit?.typeproduit}</td>
        <td class="px-6 py-4 ">${produit?.poids}</td>
        <td class="px-6 py-4 ">${produit?.nomclient}</td>
        <td class="px-6 py-4 ">${produit?.prenomclient}</td>
        <td class="px-6 py-4 ">${produit?.numclient}</td>
        <td class="px-6 py-4 ">${produit?.adressclient}</td>
        <td class="px-6 py-4">${produit?.nomdestinataire}</td>
        <td class="px-6 py-4 ">${produit?.prenomdestinataire}</td>
        <td class="px-6 py-4 ">${produit?.numdestinataire}</td>
        <td class="px-6 py-4">${produit?.adressdestinataire}</td>
        <td class="py-3 px-4 text-blue-500">
        <select class="select rounded shadow-lg select-bordered select-sm w-full max-w-xs statutproduit" data-id="${produit?.Statut}" id="${produit.codepro}">
            <option value="Disponible" ${produit?.statut === 'Disponible' ? 'selected' : ''}>Disponible</option>
            <option value="Recuperer" ${produit?.statut === 'Recuperer' ? 'selected' : ''}>Recuperer</option>
            <option value="Perdu" ${produit?.statut === 'Perdu' ? 'selected' : ''}>Perdu</option>
            <option value="Archiver" ${produit?.statut === 'Archiver' ? 'selected' : ''}>Archiver</option>
            <option value="Arriver" ${produit?.statut === 'Arriver' ? 'selected' : ''}>Arriver</option>
          </select>
        </td>
        `;
        produitList.appendChild(row1);

//changer etat produit à mettre ici

document.querySelectorAll('.statutproduit').forEach(sel => {
  sel.addEventListener('change', (event) => {
    const select = event.target as HTMLSelectElement;
    const status = select.value;
    const id = select.getAttribute("data-id");
      console.log(produit?.codepro, status);
      changerstatpro({id:id, status: status, action: "changeStatutProduit"});
    
  });
})

    });
  })

}




function changeretat(objet: any){
  envoyerversjson(objet);
  afficherCargaisons(); 
}

function changerstatus(objet: any){
  envoyerversjson(objet);
  afficherCargaisons();
}

function changerstatpro(objet: any){
  envoyerversjson(objet);
  // afficherCargaisons();
}



function gestionAlert(statu: string, message: string){
  Swal.fire({
  title: statu,
  text: message,
  icon: statu,
  showConfirmButton: false,
  timer: 3000
});
}