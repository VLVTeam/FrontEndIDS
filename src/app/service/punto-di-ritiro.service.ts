import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PuntoDiRitiro } from '../models/punto-di-ritiro';

@Injectable({
  providedIn: 'root'
})
export class PuntoDiRitiroService {

  puntoDiRitiroURL='http://localhost:8080/gestorePuntiDiRitiro/';

  constructor(private httpClient : HttpClient) { }

  public lista():Observable<PuntoDiRitiro[]>
  {
    return this.httpClient.get<PuntoDiRitiro[]>(this.puntoDiRitiroURL+'getPuntiDiRitiro');
  }

  public crea(puntoDiRitiro : PuntoDiRitiro): Observable<any>
  {
    return this.httpClient.post(this.puntoDiRitiroURL+'addPuntoDiRitiro', puntoDiRitiro);
  }

  public rimuovi(idPuntoDiRitiro : number) : Observable<any>
  {
    return this.httpClient.delete(this.puntoDiRitiroURL+ `deletePuntoDiRitiro/${idPuntoDiRitiro}`);
  }
} 
