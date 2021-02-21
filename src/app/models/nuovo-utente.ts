export class NuovoUtente {
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
}
