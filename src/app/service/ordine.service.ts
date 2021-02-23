import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NuovoCommerciante } from '../models/nuovo-commerciante';
import { NuovoCorriere } from '../models/nuovo-corriere';
import { NuovoUtente } from '../models/nuovo-utente';
import { Ordine } from '../models/ordine';
import { PuntoDiRitiro } from '../models/punto-di-ritiro';

@Injectable({
  providedIn: 'root'
})
export class OrdineService {
  ordiniURL = 'http://localhost:8080/gestoreOrdini/';

  constructor(private httpClient: HttpClient) { }


  //commerciante
  public listaOrdiniCommerciante(): Observable<Ordine[]> {
    return this.httpClient.get<Ordine[]>(this.ordiniURL + 'getOrdiniCommerciante');
  }

  public addOrdine(ordine: Ordine): Observable<any> {
    return this.httpClient.post(this.ordiniURL + 'addOrdine', ordine);
  }

  //cliente

  public listaOrdiniCliente(): Observable<Ordine[]> {
    return this.httpClient.get<Ordine[]>(this.ordiniURL + 'getOrdini');
  }


  public ritiraOrdine(idOrdine: number, codiceRitiro: string): Observable<any> {
    return this.httpClient.put(this.ordiniURL + `ritiraOrdine/${idOrdine}/${codiceRitiro}`, null)
  }


  //corriere

  public listaOrdiniLiberi(): Observable<Ordine[]> {
    return this.httpClient.get<Ordine[]>(this.ordiniURL + 'getOrdiniLiberi');
  }


  public listaOrdiniDaRitirare(): Observable<Ordine[]> {
    return this.httpClient.get<Ordine[]>(this.ordiniURL + 'getOrdiniDaRitirare');
  }


  public listaOrdiniInTransito(): Observable<Ordine[]> {
    return this.httpClient.get<Ordine[]>(this.ordiniURL + 'getOrdiniInTransito');
  }

  public listaOrdiniDepositatiPuntoDiRitiro(): Observable<Ordine[]> {
    return this.httpClient.get<Ordine[]>(this.ordiniURL + 'getOrdiniConsegnatiInPuntoDiRitiro');
  }


  public listaOrdiniConsegnati(): Observable<Ordine[]> {
    return this.httpClient.get<Ordine[]>(this.ordiniURL + 'getOrdiniConsegnati');
  }


  public setPresaInCaricoOrdine(idOrdine: number, dataPrevistaRitiro: string): Observable<any> {
    return this.httpClient.put(this.ordiniURL + `setPresaInCaricoOrdine/${idOrdine}/${dataPrevistaRitiro}`, null);
  }

  public setDataConsegnaPrevista(idOrdine: number, dataConsegnaPrevista: string): Observable<any> {
    return this.httpClient.put(this.ordiniURL + `setDataConsegnaPrevista/${idOrdine}/${dataConsegnaPrevista}`, null);
  }

  public setOrdineConsegnato(idOrdine: number): Observable<any> {
    return this.httpClient.put(this.ordiniURL + `setDataConsegnaPrevista/${idOrdine}`, null);
  }


  public setOrdineProntoPerIlRitiro(idOrdine: number): Observable<any> {
    return this.httpClient.put(this.ordiniURL + `setOrdineProntoPerIlRitiro/${idOrdine}`, null);


    
  }




  

  public getPuntoDiRitiroById(idPuntoDiRitiro:number): Observable<PuntoDiRitiro> {
    return this.httpClient.get<PuntoDiRitiro>(this.ordiniURL +  `getPuntoDiRitiroById/${idPuntoDiRitiro}`);
  }
  public getCommercianteById(idCommerciante:number): Observable<NuovoCommerciante> {
    return this.httpClient.get<NuovoCommerciante>(this.ordiniURL +  `getCommercianteById/${idCommerciante}`); 
   }

   public getClienteById(idCliente:number): Observable<NuovoUtente> {
    return this.httpClient.get<NuovoUtente>(this.ordiniURL +  `getClienteById/${idCliente}`); 
   }

   


}
