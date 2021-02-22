export class NuovoCommerciante {
    id:number;
    email:string;
    password:string;
    categoriaMerceologica:string;
    indirizzoPuntoVendita:string;
    nomePuntoVendita:string;

    constructor(email:string , password:string ,categoriaMerceologica:string  ,nomePuntoVendita:string , indirizzoPuntoVendita:string)
    {
        this.email=email;
        this.password=password;
        this.categoriaMerceologica=categoriaMerceologica;
        this.indirizzoPuntoVendita=indirizzoPuntoVendita;
        this.nomePuntoVendita=nomePuntoVendita;
    }

}
