import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NuovoUtente } from '../models/nuovo-utente';
import { CorriereService } from '../service/corriere.service';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-lista-corrieri-da-accettare',
  templateUrl: './lista-corrieri-da-accettare.component.html',
  styleUrls: ['./lista-corrieri-da-accettare.component.css']
})
export class ListaCorrieriDaAccettareComponent implements OnInit {
  isAmministratore = false;
  isCliente = false;
  isCommerciante = false;
  isCorriere = false;
  ruolo = '';
  isLogged = false;


  corrieriDaAccettare: NuovoUtente[] = [];
  constructor(private corriereService : CorriereService ,private toastr: ToastrService, private tokenService: TokenService) { }

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
      this.caricaCorrieriDaAccettare();
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



  caricaCorrieriDaAccettare(): void {
    this.corriereService.listaCorrieriDaAccettare().subscribe(
      data => {
        this.corrieriDaAccettare = data;
      },
      error => {
        console.log(error);
      }

    )
  }



  accetta(id: number): void {
    this.corriereService.accettaIscrizioneCorriere(id).subscribe(
      data => {
        console.log(data);
        this.toastr.success(data.messaggio, "OK", { timeOut: 3000, positionClass: 'toast-top-center' });

        this.caricaCorrieriDaAccettare();
      },

      err => {
        console.log(err);
        this.toastr.error(err.error.message, 'Fail', { timeOut: 3000, positionClass: "toast-top-center" });

      }
    )
  }

}
