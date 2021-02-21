import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtDto } from '../models/jwt-dto';
import { LoginUtente } from '../models/login-utente';
import { NuovoCommerciante } from '../models/nuovo-commerciante';
import { NuovoCorriere } from '../models/nuovo-corriere';
import { NuovoUtente } from '../models/nuovo-utente';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
authURL='http://localhost:8080/auth/';

  constructor(private httpClient: HttpClient) { }

  public nuovoCliente(nuovoUtente: NuovoUtente) : Observable<any>{
    return this.httpClient.post<any>(this.authURL + 'nuovoCliente' , nuovoUtente);
  }

  public nuovoCommerciante(nuovoCommerciante: NuovoCommerciante) : Observable<any>{
    return this.httpClient.post<any>(this.authURL + 'nuovoCommerciante' , nuovoCommerciante);
  }

  public nuovoCorriere(nuovoCorriere: NuovoCorriere) : Observable<any>{
    return this.httpClient.post<any>(this.authURL + 'nuovoCorriere' , nuovoCorriere);
  }

  public login(loginUtente: LoginUtente) : Observable<JwtDto>{
   
    return this.httpClient.post<JwtDto>(this.authURL + 'login' , loginUtente);
  }
}
