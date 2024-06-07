export class Cargaison {
  action: string;
  code: string;
  type: string;
  poids: number;
  distance: number;
  dateDepartPrevue: string;
  dateArriveePrevue: string;
  lieuDepart: string;
  lieuArrivee: string;
  etat: string;
  status: string;
  produits: string[];

  constructor(action: string, code: string, type: string, poids: number, distance: number,
    dateDepartPrevue: string, dateArriveePrevue: string, lieuDepart: string, lieuArrivee: string, etat:string, status: string, produits: string[]) {
    this.action = action
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

  getInfo():{}{
    return {
      "action":this.action,
      "code": this.code,
      "type": this.type,
      "poids": this.poids,
      "distance": this.distance,
      "lieuDepart":this.lieuDepart,
      "lieuArrivee":this.lieuArrivee,
      "status":this.status,
      "dateDepartPrevue":this.dateDepartPrevue,
      "dateArriveePrevue":this.dateArriveePrevue,
      "etat":this.etat,
      "produits":this.produits
    };
  }

}

