import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NuovoCommerciante } from '../models/nuovo-commerciante';
import { NuovoUtente } from '../models/nuovo-utente';


@Injectable({
  providedIn: 'root'
})
export class CommercianteService {

  commercianteURL='http://localhost:8080/gestoreCommercianti/';

  constructor(private httpClient : HttpClient) { }

  public listaCommerciantiDaAccettare():Observable<NuovoUtente[]>
  {
    return this.httpClient.get<NuovoUtente[]>(this.commercianteURL+'getCommerciantiDaAccettare');
  }

  public listaCommercianti():Observable<NuovoUtente[]>
  {
    return this.httpClient.get<NuovoUtente[]>(this.commercianteURL+'getCommercianti');
  }
  
  public accettaIscrizioneCommerciante(idCommerciante:number):Observable<any>
  {
    return this.httpClient.put<any>(this.commercianteURL+`accettaIscrizioneCommerciante/${idCommerciante}`,null);
  }

  
  public dettaglioCommerciante(idUtente:number):Observable<NuovoCommerciante>
  {
    return this.httpClient.get<NuovoCommerciante>(this.commercianteURL+`getCommercianteByIdUtente/${idUtente}`);
  }
}
