import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NuovoUtente } from '../models/nuovo-utente';
import { OrdineService } from '../service/ordine.service';
import { TokenService } from '../service/token.service';


import { Location } from '@angular/common';


@Component({
  selector: 'app-dettaglio-cliente-ordine',
  templateUrl: './dettaglio-cliente-ordine.component.html',
  styleUrls: ['./dettaglio-cliente-ordine.component.css']
})
export class DettaglioClienteOrdineComponent implements OnInit {
  
  isLogged = false;


  cliente: NuovoUtente = null;
  constructor(private ordineService: OrdineService, private activatedRouter: ActivatedRoute, private toastr: ToastrService, private router: Router, private tokenService: TokenService , private location : Location) { }


  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
  
      const id = this.activatedRouter.snapshot.params.id;
      this.ordineService.getClienteById(id).subscribe(
        data => {
          this.cliente = data;
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
      
    }

  }


  indietro(): void {
  
    this.location.back();
  }





}
