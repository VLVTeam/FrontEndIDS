export class NuovoCorriere {

    id:number;
    
    email:string;
    password:string;

    nomeDitta:string;
    
    constructor(email:string , password:string , nomeDitta:string)
    {
        this.email=email;
        this.password=password;
        this.nomeDitta=nomeDitta;
    }

}
