import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DettaglioCommercianteComponent } from './amministratore/dettaglio-commerciante.component';

import { DettaglioCorriereComponent } from './amministratore/dettaglio-corriere.component';

import { ListaCommerciantiDaAccettareComponent } from './amministratore/lista-commercianti-da-accettare.component';
import { ListaCorrieriDaAccettareComponent } from './amministratore/lista-corrieri-da-accettare.component';
import { LoginComponent } from './auth/login.component';
import { RegistroCommercianteComponent } from './auth/registro-commerciante.component';
import { RegistroCorriereComponent } from './auth/registro-corriere.component';
import { RegistroComponent } from './auth/registro.component';
import { DettaglioClienteOrdineComponent } from './commerciante/dettaglio-cliente-ordine.component';

//import { DettaglioCorriereOrdineComponent } from './commerciante/dettaglio-corriere-ordine.component';

import { DettaglioPuntoDiRitiroOrdineComponent } from './commerciante/dettaglio-punto-di-ritiro-ordine.component';
import { ListaOrdiniCommercianteComponent } from './commerciante/lista-ordini-commerciante.component';
import { ListaPromozioniComponent } from './commerciante/lista-promozioni.component';
import { NuovoOrdineComponent } from './commerciante/nuovo-ordine.component';
import { PuntoGuardService as guard} from './guards/punto-guard.service';
import { IndexComponent } from './index/index.component';
//import { ListaPromozioniUtenteComponent } from './promozione/lista-promozioni-utente.component';
import { NuovaPromozioneComponent } from './commerciante/nuova-promozione.component';
import { ListaPuntiDiRitiroComponent } from './amministratore/lista-punti-di-ritiro.component';
import { NuovoPuntoDiRitiroComponent } from './amministratore/nuovo-punto-di-ritiro.component';
import { ListaPromozioniClienteComponent }  from './cliente/lista-promozioni-cliente.component';

//import { DettaglioCommerciantePromozioneComponent } from './cliente/dettaglio-commerciante-promozione.component';

import { ListaOrdiniClienteComponent } from './cliente/lista-ordini-cliente.component';
import { ListaOrdiniLiberiComponent } from './corriere/lista-ordini-liberi.component';
import { ListaOrdiniDaRitirareComponent } from './corriere/lista-ordini-da-ritirare.component';
import { ListaOrdiniDaDepositareComponent } from './corriere/lista-ordini-da-depositare.component';
import { ListaOrdiniDepositatiComponent } from './corriere/lista-ordini-depositati.component';
import { ListaOrdiniConsegnatiComponent } from './corriere/lista-ordini-consegnati.component';
import { ListaCommerciantiComponent } from './cliente/lista-commercianti.component';


const routes: Routes = [
  {path:'',component:IndexComponent},
  {path:'login',component:LoginComponent},
  {path:'registro',component:RegistroComponent},
  {path:'registroCommerciante',component:RegistroCommercianteComponent},
  {path:'registroCorriere',component:RegistroCorriereComponent},

  {path: 'listaCommerciantiDaAccettare',component: ListaCommerciantiDaAccettareComponent , canActivate:[guard] , data: {expectedRol:['amministratore']}},
  {path: 'listaCorrieriDaAccettare',component: ListaCorrieriDaAccettareComponent , canActivate:[guard] , data: {expectedRol:['amministratore']}},
  
  {path: 'listaPuntiDiRitiro',component: ListaPuntiDiRitiroComponent , canActivate:[guard] , data: {expectedRol:['amministratore','commerciante']}},
  {path: 'nuovoPuntoDiRitiro', component : NuovoPuntoDiRitiroComponent ,canActivate:[guard] , data: {expectedRol:['amministratore']}},
  //{path: 'deletePuntoDiRitiro/:id', component : RimuoviPuntoDiRitiroComponent},
  {path: 'dettaglioCommerciante/:id', component : DettaglioCommercianteComponent},
  {path: 'dettaglioCorriere/:id', component : DettaglioCorriereComponent},
  
 // {path: 'dettaglioCommerciantePromozione/:id', component : DettaglioCommerciantePromozioneComponent},

  {path: 'listaPromozioniCliente',component: ListaPromozioniClienteComponent , canActivate:[guard] , data: {expectedRol:['cliente']}},
  {path: 'listaOrdiniCliente',component: ListaOrdiniClienteComponent , canActivate:[guard] , data: {expectedRol:['cliente']}},

  {path: 'listaPromozioniCommerciante',component: ListaPromozioniComponent , canActivate:[guard] , data: {expectedRol:['commerciante']}},
  {path: 'nuovaPromozione',component: NuovaPromozioneComponent , canActivate:[guard] , data: {expectedRol:['commerciante']}},
  {path: 'listaOrdiniCommerciante',component: ListaOrdiniCommercianteComponent , canActivate:[guard] , data: {expectedRol:['commerciante']}},
  {path: 'nuovoOrdine',component: NuovoOrdineComponent , canActivate:[guard] , data: {expectedRol:['commerciante']}},
  
 // {path: 'dettaglioCorriereOrdine/:id', component : DettaglioCorriereOrdineComponent},
 
  {path: 'dettaglioClienteOrdine/:id', component : DettaglioClienteOrdineComponent},
  {path: 'dettaglioPuntoDiRitiroOrdine/:id', component : DettaglioPuntoDiRitiroOrdineComponent},



  {path: 'listaCommercianti',component: ListaCommerciantiComponent , canActivate:[guard] , data: {expectedRol:['cliente']}},


  

  {path: 'listaOrdiniLiberi',component: ListaOrdiniLiberiComponent , canActivate:[guard] , data: {expectedRol:['corriere']}},
  {path: 'listaOrdiniDaRitiriare',component: ListaOrdiniDaRitirareComponent , canActivate:[guard] , data: {expectedRol:['corriere']}},
  {path: 'listaOrdiniDaDepositare',component: ListaOrdiniDaDepositareComponent , canActivate:[guard] , data: {expectedRol:['corriere']}},
  {path: 'listaOrdiniDepositati',component: ListaOrdiniDepositatiComponent , canActivate:[guard] , data: {expectedRol:['corriere']}},
  {path: 'listaOrdiniConsegnati',component: ListaOrdiniConsegnatiComponent , canActivate:[guard] , data: {expectedRol:['corriere']}},




  {path :'**' , redirectTo :'' ,pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
