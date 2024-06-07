export class Cargaison {
    constructor(action, code, type, poids, distance, dateDepartPrevue, dateArriveePrevue, lieuDepart, lieuArrivee, etat, status, produits) {
        this.action = action;
        this.code = code;
        this.type = type;
        this.poids = poids;
        this.distance = distance;
        this.dateDepartPrevue = dateDepartPrevue;
        this.dateArriveePrevue = dateArriveePrevue;
        this.lieuDepart = lieuDepart;
        this.lieuArrivee = lieuArrivee;
        this.etat = etat;
        this.status = status;
        this.produits = produits;
    }
    getInfo() {
        return {
            "action": this.action,
            "code": this.code,
            "type": this.type,
            "poids": this.poids,
            "distance": this.distance,
            "lieuDepart": this.lieuDepart,
            "lieuArrivee": this.lieuArrivee,
            "status": this.status,
            "dateDepartPrevue": this.dateDepartPrevue,
            "dateArriveePrevue": this.dateArriveePrevue,
            "etat": this.etat,
            "produits": this.produits
        };
    }
}
