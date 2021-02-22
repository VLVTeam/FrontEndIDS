export class NuovoUtente {
    id:number;
    email:string;
    password:string;
    nome:string;
    cognome:string;
    indirizzo:string;

        // E IL CLIENTE
    constructor(email:string , password:string ,nome:string , cognome:string , indirizzo:string)
    {
        this.email=email;
        this.password=password;
        this.nome=nome;
        this.cognome=cognome;
        this.indirizzo=indirizzo;
    }



//UTENTE
    constructorUtente( id :number ,email:string , password:string )
    {
        this.id=id;
        this.email=email;
        this.password=password;
       
    }
}
