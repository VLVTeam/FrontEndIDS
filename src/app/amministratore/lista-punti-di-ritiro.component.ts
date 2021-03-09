import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PuntoDiRitiro } from '../models/punto-di-ritiro';
import { PuntoDiRitiroService } from '../service/punto-di-ritiro.service';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-lista-punti-di-ritiro',
  templateUrl: './lista-punti-di-ritiro.component.html',
  styleUrls: ['./lista-punti-di-ritiro.component.css']
})
export class ListaPuntiDiRitiroComponent implements OnInit {

  puntiDiRitiro: PuntoDiRitiro[] = [];

  isAmministratore = false;
  isCliente = false;
  isCommerciante = false;
  isCorriere = false;
  ruolo = '';
  isLogged = false;

  constructor(private puntoDiRitiroService: PuntoDiRitiroService, private toastr: ToastrService, private tokenService: TokenService) { }




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
      this.caricaPuntiDiRitiro();
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

  caricaPuntiDiRitiro(): void {
    this.puntoDiRitiroService.lista().subscribe(
      data => {
        this.puntiDiRitiro = data;
      },
      error => {
        console.log(error);
      }

    )
  }


  elimina(id: number): void {
    this.puntoDiRitiroService.rimuovi(id).subscribe(
      data => {
        console.log(data);
        this.toastr.success(data.messaggio, "OK", { timeOut: 3000, positionClass: 'toast-top-center' });

        this.caricaPuntiDiRitiro();
      },

      err => {
        console.log(err);
        this.toastr.error(err.error.message, 'Fail', { timeOut: 3000, positionClass: "toast-top-center" });

      }
    )
  }



}
