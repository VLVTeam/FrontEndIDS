import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PuntoDiRitiro } from '../models/punto-di-ritiro';
import { OrdineService } from '../service/ordine.service';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-dettaglio-punto-di-ritiro-ordine',
  templateUrl: './dettaglio-punto-di-ritiro-ordine.component.html',
  styleUrls: ['./dettaglio-punto-di-ritiro-ordine.component.css']
})
export class DettaglioPuntoDiRitiroOrdineComponent implements OnInit {
  isAmministratore = false;
  isCliente = false;
  isCommerciante = false;
  isCorriere = false;
  ruolo = '';
  isLogged = false;
  puntoDiRitiro:PuntoDiRitiro = null;

  constructor(private ordineService:OrdineService,private activatedRouter : ActivatedRoute ,private toastr:ToastrService ,private router : Router, private tokenService :TokenService) { }

 /*  ngOnInit(): void {
    const id = this.activatedRouter.snapshot.params.id;
    this.ordineService.getPuntoDiRitiroById(id).subscribe(
      data => {
        this.puntoDiRitiro = data;
      },
      err => {
        console.log(err);
        this.toastr.error(err.error.message, 'Fail', { timeOut: 3000, positionClass: "toast-top-center" });
        this.indietro();
      }

    )
  } */


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
      const id = this.activatedRouter.snapshot.params.id;
    this.ordineService.getPuntoDiRitiroById(id).subscribe(
      data => {
        this.puntoDiRitiro = data;
      },
      err => {
        console.log(err);
        this.toastr.error(err.error.message, 'Fail', { timeOut: 3000, positionClass: "toast-top-center" });
        this.indietro();
      }

    )
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
  indietro():void
  {
    if(this.isCliente){
      this.router.navigate(['/listaOrdiniCliente']);
    }
    else if(this.isCorriere){}
    else{
    this.router.navigate(['/listaOrdiniCommerciante']);
    }
  }


}