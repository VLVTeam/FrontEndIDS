import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NuovaPromozioneComponent } from './promozione/nuova-promozione.component';
import { ListaPromozioniUtenteComponent } from './promozione/lista-promozioni-utente.component';
import { NuovoPuntoDiRitiroComponent } from './puntoDiRitiro/nuovo-punto-di-ritiro.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';


//external
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
//


import { ListaPuntiDiRitiroComponent } from './puntoDiRitiro/lista-punti-di-ritiro.component';
import { LoginComponent } from './auth/login.component';
import { RegistroComponent } from './auth/registro.component';
import { MenuComponent } from './menu/menu.component';
import { IndexComponent } from './index/index.component';
import { interceptorProvider } from './interceptors/punto-interceptor.service';
import { RegistroCommercianteComponent } from './auth/registro-commerciante.component';
import { RegistroCorriereComponent } from './auth/registro-corriere.component';
import { ListaCommerciantiDaAccettareComponent } from './amministratore/lista-commercianti-da-accettare.component';
import { DettaglioCommercianteComponent } from './amministratore/dettaglio-commerciante.component';
import { DettaglioCorriereComponent } from './amministratore/dettaglio-corriere.component';
import { ListaCorrieriDaAccettareComponent } from './amministratore/lista-corrieri-da-accettare.component';

@NgModule({
  declarations: [
    AppComponent,
    NuovaPromozioneComponent,
    ListaPromozioniUtenteComponent,
    NuovoPuntoDiRitiroComponent,
    ListaPuntiDiRitiroComponent,
    LoginComponent,
    RegistroComponent,
    RegistroCommercianteComponent,
    MenuComponent,
    IndexComponent,
    RegistroCommercianteComponent,
    RegistroCorriereComponent,
    ListaCommerciantiDaAccettareComponent,
    DettaglioCommercianteComponent,
    DettaglioCorriereComponent,
    ListaCorrieriDaAccettareComponent
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule, 
    ToastrModule.forRoot() ,
    HttpClientModule,
    FormsModule
  ],
  providers: [interceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
