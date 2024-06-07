export class Produit {
    constructor(action, codepro, nomproduit, typeproduit, poids, nomclient, prenomclient, numclient, adressclient, emailclient, nomdestinataire, prenomdestinataire, numdestinataire, adressdestinataire, idcargo, emaildestinataire, statut) {
        this.action = action;
        this.codepro = codepro;
        this.nomproduit = nomproduit;
        this.typeproduit = typeproduit;
        this.poids = poids;
        this.nomclient = nomclient;
        this.prenomclient = prenomclient;
        this.numclient = numclient;
        this.adressclient = adressclient;
        this.emailclient = emailclient;
        this.nomdestinataire = nomdestinataire;
        this.prenomdestinataire = prenomdestinataire;
        this.numdestinataire = numdestinataire;
        this.adressdestinataire = adressdestinataire;
        this.idcargo = idcargo;
        this.emaildestinataire = emaildestinataire;
        this.statut = statut;
    }
    getInfo() {
        return {
            "action": this.action,
            "codepro": this.codepro,
            "nomproduit": this.nomproduit,
            "typeproduit": this.typeproduit,
            "poids": this.poids,
            "nomclient": this.nomclient,
            "prenomclient": this.prenomclient,
            "numclient": this.numclient,
            "adressclient": this.adressclient,
            "emailclient": this.emailclient,
            "nomdestinataire": this.nomdestinataire,
            "prenomdestinataire": this.prenomdestinataire,
            "numdestinataire": this.numdestinataire,
            "adressdestinataire": this.adressdestinataire,
            "idcargo": this.idcargo,
            "emaildestinataire": this.emaildestinataire,
            "statut": this.statut
        };
    }
}
