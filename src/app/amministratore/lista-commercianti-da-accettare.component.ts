import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NuovoCommerciante } from '../models/nuovo-commerciante';
import { NuovoUtente } from '../models/nuovo-utente';
import { CommercianteService } from '../service/commerciante.service';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-lista-commercianti-da-accettare',
  templateUrl: './lista-commercianti-da-accettare.component.html',
  styleUrls: ['./lista-commercianti-da-accettare.component.css']
})
export class ListaCommerciantiDaAccettareComponent implements OnInit {
  isAmministratore = false;
  isCliente = false;
  isCommerciante = false;
  isCorriere = false;
  ruolo = '';
  isLogged = false;


  commerciantiDaAccettare: NuovoUtente[] = [];

  constructor(private commercianteService: CommercianteService, private toastr: ToastrService, private tokenService: TokenService) { }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      if (this.tokenService.getAuthorities().includes('ROLE_AMMINISTRATORE')) {
        this.isAmministratore = true;
        this.isCliente = false;
        this.isCommerciante = false;
        this.isCorriere = false;
        this.ruolo = 'Amministratore';
      }
      else if (this.tokenService.getAuthorities().includes('ROLE_CLIENTE')) {
        this.isAmministratore = false;
        this.isCliente = true;
        this.isCommerciante = false;
        this.isCorriere = false;
        this.ruolo = 'Cliente';
      }
      else if (this.tokenService.getAuthorities().includes('ROLE_COMMERCIANTE')) {
        this.isAmministratore = false;
        this.isCliente = false;
        this.isCommerciante = true;
        this.isCorriere = false;
        this.ruolo = 'Commerciante';
      }
      else if (this.tokenService.getAuthorities().includes('ROLE_CORRIERE')) {
        this.isAmministratore = false;
        this.isCliente = false;
        this.isCommerciante = false;
        this.isCorriere = true;
        this.ruolo = 'Corriere';
      }
      this.caricaCommerciantiDaAccettare();
    }
    else {
      this.isLogged = false;
      this.ruolo = '';
      this.isAmministratore = false;
      this.isCliente = false;
      this.isCommerciante = false;
      this.isCorriere = false;
    }

  }


  caricaCommerciantiDaAccettare(): void {
    this.commercianteService.listaCommerciantiDaAccettare().subscribe(
      data => {
        this.commerciantiDaAccettare = data;
      },
      error => {
        console.log(error);
      }

    )
  }




  accetta(id: number): void {
    this.commercianteService.accettaIscrizioneCommerciante(id).subscribe(
      data => {
        console.log(data);
        this.toastr.success(data.messaggio, "OK", { timeOut: 3000, positionClass: 'toast-top-center' });

        this.caricaCommerciantiDaAccettare();
      },

      err => {
        console.log(err);
        this.toastr.error(err.error.message, 'Fail', { timeOut: 3000, positionClass: "toast-top-center" });

      }
    )
  }
}
