export class Ordine {

    id:number;
    codiceRitiro:string;
    descrizione:string;
    idCommerciante:number;
    idCliente:number;
    idCorriere:number;
    idPuntoDiRitiro:number;
    stato:string;
    dataCreazione:Date;
    dataRitiro:Date;
    dataConsegnaPrevista:Date;

    constructor( codiceRitiro:string ,  descrizione:string,  idCliente:number , idPuntoDiRitiro?:number)
    {
        this.codiceRitiro=codiceRitiro;
        this.descrizione=descrizione;
        this.idCliente=idCliente;
        if(idPuntoDiRitiro){
        this.idPuntoDiRitiro=idPuntoDiRitiro;
        }
    }
    
  

}

