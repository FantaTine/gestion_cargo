document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form") as HTMLFormElement;
  
    form.addEventListener("submit", (event) => {
        event.preventDefault();
      
            ajouterCargaison();
        
    });
});

function ajouterCargaison(): void {

    const type = (document.getElementById("type") as HTMLSelectElement).value;
    const poids = parseFloat((document.getElementById("poids") as HTMLInputElement).value);
    const distance = parseFloat((document.getElementById("distance") as HTMLInputElement).value);
    const dateDepartPrevue = (document.getElementById("datedepart") as HTMLInputElement).value;
    const dateArriveePrevue = (document.getElementById("datearrivee") as HTMLInputElement).value;
    const lieuDepart = (document.getElementById("departure-coordinates") as HTMLInputElement).value;
    const lieuArrivee = (document.getElementById("arrival-coordinates") as HTMLInputElement).value;
    const coordonneesDepart = getCoordinates(lieuDepart);
    const coordonneesArrivee = getCoordinates(lieuArrivee);
    const code = parseInt((document.getElementById("code") as HTMLInputElement).value);
    const status = (document.getElementById("status") as HTMLInputElement).value;

    const nouvelleCargaison = {
        code,
        type,
        poids,
        distance,
        dateDepartPrevue,
        dateArriveePrevue,
        lieuDepart,
        lieuArrivee,
        coordonneesDepart,
        coordonneesArrivee,
        status
    };

    fetch("enregistrer_cargaison.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(nouvelleCargaison)
    })
    .then(response => response.json())
    .then(data => {
        console.log("Cargaison enregistrée avec succès :", data);
        ajouterCargaisonAuTableau(nouvelleCargaison);
    })
    .catch(error => {
        console.error("Erreur lors de l'enregistrement de la cargaison :", error);
    });
}

function ajouterCargaisonAuTableau(nouvelleCargaison: any): void {
    const tbody = document.querySelector("tbody");
    if (tbody) {
        const tr = document.createElement("tr");
        tr.classList.add("border-b", "border-gray-200", "hover:bg-gray-100");
        tr.innerHTML = `
            <td class="py-3 px-4">${nouvelleCargaison.code}</td>
            <td class="py-3 px-4">${nouvelleCargaison.lieuDepart}</td>
            <td class="py-3 px-4">${nouvelleCargaison.lieuArrivee}</td>
            <td class="py-3 px-4">${nouvelleCargaison.dateDepartPrevue}</td>
            <td class="py-3 px-4">${nouvelleCargaison.dateArriveePrevue}</td>
            <td class="py-3 px-4">${nouvelleCargaison.type}</td>
            <td class="py-3 px-4 ${nouvelleCargaison.status === 'Ouvert' ? 'text-green-500' : 'text-red-500'}">${nouvelleCargaison.status}</td>
            <td class="py-3 px-4">
                <button class="bg-blue-500 text-white px-2 py-1 rounded">Détails</button>
            </td>
        `;
        tbody.appendChild(tr);
    }
}

function getCoordinates(location: string): { lat: number, lng: number } {
    // Implémentation pour obtenir les coordonnées basées sur la localisation
    // Par exemple, via une API de géocodage
    return { lat: 0, lng: 0 }; // Remplacer par la logique réelle pour obtenir les coordonnées
}
