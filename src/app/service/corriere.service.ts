import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NuovoCorriere } from '../models/nuovo-corriere';
import { NuovoUtente } from '../models/nuovo-utente';

@Injectable({
  providedIn: 'root'
})
export class CorriereService {

  

  corriereURL='http://localhost:8080/gestoreCorrieri/';
  constructor(private httpClient : HttpClient) { }
  

  public listaCorrieriDaAccettare():Observable<NuovoUtente[]>
  {
    return this.httpClient.get<NuovoUtente[]>(this.corriereURL+'getCorrieriDaAccettare');
  }

 
  
  public accettaIscrizioneCorriere(idCorriere:number):Observable<any>
  {
    return this.httpClient.put<any>(this.corriereURL+`accettaIscrizioneCorriere/${idCorriere}`,null);

  }


  public dettagliocorriere(idUtente:number):Observable<NuovoCorriere>
  {
    return this.httpClient.get<NuovoCorriere>(this.corriereURL+`getCorriereByIdUtente/${idUtente}`)
  }
}
