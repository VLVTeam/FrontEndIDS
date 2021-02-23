import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NuovoUtente } from '../models/nuovo-utente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  clienteURL = 'http://localhost:8080/gestoreClienti/';
  constructor(private httpClient: HttpClient) { }



  public listaClienti(): Observable<NuovoUtente[]> {
  {
    return this.httpClient.get<NuovoUtente[]>(this.clienteURL + 'getClienti');
  }
}
}