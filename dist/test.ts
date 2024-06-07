/* import {Aerienne} from './model/aerienne.js';
import {Maritime} from './model/maritime.js';
import {Routiere} from './model/routiere.js'; */
import { Cargaison} from './model/cargaison.js';
import { Produit} from './model/produit.js';


document.getElementById('form')?.addEventListener('submit', (event) => {
     event.preventDefault();
     const errorElements = document.querySelectorAll('.text-red-500');
     errorElements.forEach(el => el.textContent = ''); 
     const typeCargaison:string = (document.getElementById('type') as HTMLSelectElement).value;
     const distance:number = parseFloat((document.getElementById('distance') as HTMLInputElement).value);
     const numero:string = "FN" + Math.floor(Math.random() * 1000);  // Générer un numéro aléatoire pour la cargaison
     const poidsCargaison:number = parseFloat((document.getElementById('poids') as HTMLInputElement).value);
     const pointDepart:string = (document.getElementById('departure-coordinates') as HTMLInputElement).value;
     const pointArrive:string = (document.getElementById('arrival-coordinates') as HTMLInputElement).value;
     const dateDepart:string = (document.getElementById('datedepart') as HTMLInputElement).value;
     const dateArrive:string = (document.getElementById('datearrivee') as HTMLInputElement).value;
   
    
     const cargaison = new Cargaison (
      "ajoutcargaison",
       numero,
       typeCargaison,
       poidsCargaison,
       distance,
       dateDepart,
       dateArrive,
       pointDepart,
       pointArrive,
       "en attente",
       "ouvert",
        []
     )

    
     console.log(cargaison);
     fetch("enregistrer_cargaison.php", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(cargaison.getInfo()),
        })
          .then(response => response.json())
          .then(data => console.log(data))
          .catch(error => console.error('Error:', error));
     return false;
     
   
   });


   const selectedLimit =document.getElementById('selectLimite') as HTMLSelectElement;

   selectedLimit.addEventListener('change',function(e) {

     if(selectedLimit.value== "poids"){
          document.getElementById('produitTotal')?.classList.add("hidden") ;
          document.getElementById('poidsTotal')?.classList.remove("hidden") ;
        
     }
     if(selectedLimit.value== "produit"){
          document.getElementById('poidsTotal')?.classList.add("hidden") ;
          document.getElementById('produitTotal')?.classList.remove("hidden") ;
        
     }
   })
var id:string |null
   function afficherCargaisons( cargo:Cargaison[]): void {
    fetch('enregistrer_cargaison.php')
      .then(response => response.json())
      .then(data => {
        const cargaisons: Cargaison[] = data.cargaisons;
        const cargaisonList = document.getElementById('bodycargo');
        if (!cargaisonList) return;
        cargaisonList.innerHTML = '';
        cargaisons.forEach(cargaison => {
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
  
        
      }) 

      document.addEventListener('click', (event) => {
        const target = event.target as HTMLElement;
        if (target.classList.contains('btn-ajt')) {
             id = target.getAttribute('data-id');
            console.log(id);
            const my_modal_3 = document.getElementById('my_modal_3') as HTMLDialogElement;
            if (id) {
                // Ici vous pouvez exécuter votre logique pour l'élément avec l'id récupéré
                my_modal_3!.showModal();
            }
        }
    });

    /* .catch(error => console.error('Erreur:', error)); */
   }  
let cargo:Cargaison[]=[];
   afficherCargaisons(cargo);


   function afficherCargaisons111(cargaisons: Cargaison[], filtre: { [key: string]: string | number }) {
    // Filtrer les cargaisons selon les critères fournis
    let result = cargaisons;

    if (filtre) {
        if (filtre.code) {
            result = result.filter(cargaison => cargaison.code.toLowerCase().includes((filtre.code as string).toLowerCase()));
        }
        if (filtre.lieuDepart) {
            result = result.filter(cargaison => cargaison.lieuDepart.toLowerCase().includes((filtre.lieuDepart as string).toLowerCase()));
        }
        if (filtre.lieuArrivee) {
            result = result.filter(cargaison => cargaison.lieuArrivee.toLowerCase().includes((filtre.lieuArrivee as string).toLowerCase()));
        }
        if (filtre.dateDepartPrevue) {
            result = result.filter(cargaison => cargaison.dateDepartPrevue.toLowerCase().includes((filtre.dateDepartPrevue as string).toLowerCase()));
        }
        if (filtre.dateArriveePrevue) {
            result = result.filter(cargaison => cargaison.dateArriveePrevue.toLowerCase().includes((filtre.dateArriveePrevue as string).toLowerCase()));
        }
        if (filtre.type) {
            result = result.filter(cargaison => cargaison.type.toLowerCase().includes((filtre.type as string).toLowerCase()));
        }
        if (filtre.status) {
            result = result.filter(cargaison => cargaison.status.toLowerCase().includes((filtre.status as string).toLowerCase()));
        }
        if (filtre.etat) {
            result = result.filter(cargaison => cargaison.etat.toLowerCase().includes((filtre.etat as string).toLowerCase()));
        }

    }

    // Afficher les cargaisons filtrées
    afficherCargaisons(result);
}
// Récupérez une référence vers chaque champ de recherche
const searchFields = [
    "code",
    "departure-coordinates",
    "arrival-coordinates",
    "datedepart",
    "datearrivee",
    // "type",
    // "status",
    // "etat"
];

// Ajoutez un écouteur d'événements "input" à chaque champ de recherche
searchFields.forEach(fieldId => {
  let cargaison = cargo;
    const field = document.getElementById(fieldId) as HTMLInputElement;
    field.addEventListener('input', function() {
        // Récupérez les valeurs des champs de recherche
        const code: string = (document.getElementById('code') as HTMLInputElement).value;
        const departure_coordinates: string = (document.getElementById('departure-coordinates') as HTMLInputElement).value;
        const arrival_coordinates: string = (document.getElementById('arrival-coordinates') as HTMLInputElement).value;
        const datedepart: string = (document.getElementById('datedepart') as HTMLInputElement).value;
        const datearrivee: string = (document.getElementById('datearrivee') as HTMLInputElement).value;
        // const type: string = (document.getElementById('type') as HTMLInputElement).value;
        // const date_arrivee: string = (document.getElementById('search-field-7') as HTMLInputElement).value;
        // const etat_avancement: string = (document.getElementById('search-field-8') as HTMLInputElement).value;
        // const distance: number = parseFloat((document.getElementById("search-field-9") as HTMLInputElement).value);

        // Créez un objet contenant les critères de filtrage
        const filtre = {
            code,
            departure_coordinates,
            arrival_coordinates,
            datedepart,
            datearrivee,
            // type,
            // date_arrivee,
            // etat_avancement,
            // distance
        };

        // Appelez la fonction afficherCargaisons111 avec les cargaisons et les critères de filtrage
        afficherCargaisons111(cargaison, filtre);
    });
});
 

document.getElementById('butonAdd')?.addEventListener('click', function(event) {

  event.preventDefault();

  const nomproduit = (document.getElementById('nomproduit') as HTMLInputElement).value;
  const typeproduit = (document.getElementById('typeproduit') as HTMLInputElement).value;
  const poids = parseFloat((document.getElementById("poids") as HTMLInputElement).value);
  const nomclient = (document.getElementById('nomclient') as HTMLInputElement).value;
  const prenomclient = (document.getElementById('prenomclient') as HTMLInputElement).value;
  const numclient = parseFloat((document.getElementById("numclient") as HTMLInputElement).value);
  const adressclient = (document.getElementById('adressclient') as HTMLInputElement).value;
  const nomdestinataire = (document.getElementById('nomdestinataire') as HTMLInputElement).value;
  const prenomdestinataire = (document.getElementById('prenomdestinataire') as HTMLInputElement).value;
  const numdestinataire = parseFloat((document.getElementById("numdestinataire") as HTMLInputElement).value);
  const adressdestinataire = (document.getElementById('adressdestinataire') as HTMLInputElement).value;
  
  

const produit = new Produit (
  "ajoutproduit",
  nomproduit,
  typeproduit,
  poids,
  nomclient,
  prenomclient,
  numclient,
  adressclient,
  nomdestinataire,
  prenomdestinataire,
  numdestinataire,
  adressdestinataire,
  id
)

console.log(JSON.stringify(produit));

fetch("enregistrer_cargaison.php", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(produit),
})
 .then(response => {
  if(response.ok){
    return response.json()
  }else{
    console.log("bvne,;");
    
  }
 })
 
 
 .then(data => console.log(data))


});

console.log("simple");
