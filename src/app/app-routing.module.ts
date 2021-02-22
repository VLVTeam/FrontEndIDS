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
import { PuntoGuardService as guard} from './guards/punto-guard.service';
import { IndexComponent } from './index/index.component';
import { ListaPromozioniUtenteComponent } from './promozione/lista-promozioni-utente.component';
import { ListaPuntiDiRitiroComponent } from './puntoDiRitiro/lista-punti-di-ritiro.component';
import { NuovoPuntoDiRitiroComponent } from './puntoDiRitiro/nuovo-punto-di-ritiro.component';


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

  
  {path :'**' , redirectTo :'' ,pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
