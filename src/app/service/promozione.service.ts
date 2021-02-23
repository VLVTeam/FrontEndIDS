import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Promozione } from '../models/promozione';

@Injectable({
  providedIn: 'root'
})
export class PromozioneService {

  promozioneURL='http://localhost:8080/gestorePromozioni/';
  constructor(private httpClient : HttpClient) { }


  public listaPromozioniCommerciante():Observable<Promozione[]>
  {
    return this.httpClient.get<Promozione[]>(this.promozioneURL+'getPromozioniCommerciante');
  }

  public addPromozione(promozione : Promozione):Observable<any>
  {
    return this.httpClient.post(this.promozioneURL+'addPromozione',promozione);
  }

  public rimuoviPromozione(idPromozione : number) : Observable<any>
  {
    return this.httpClient.delete(this.promozioneURL+ `deletePromozione/${idPromozione}`);
  }

  public listaPromozioniNonScadute():Observable<Promozione[]>
  {
    return this.httpClient.get<Promozione[]>(this.promozioneURL+'getPromozioniNonScadute');
  }

  public listaPromozioniFiltrate(categoriaMerceologica:string):Observable<Promozione[]>
  {
    return this.httpClient.get<Promozione[]>(this.promozioneURL+`getPromozioniNonScadute/${categoriaMerceologica}`);
  }

}
