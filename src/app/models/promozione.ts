export class Promozione {

    id: number;
    descrizione: string;
    idCommerciante : number;
   dataInizio :Date;
   dataFine:Date;

   constructor(descrizione:string , dataInizio : Date , dataFine : Date)
   {
       this.descrizione=descrizione;
       this.dataInizio=dataInizio;
       this.dataFine=dataFine;
   }
    
}
