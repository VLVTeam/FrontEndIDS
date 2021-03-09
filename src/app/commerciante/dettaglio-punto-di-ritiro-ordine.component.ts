import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PuntoDiRitiro } from '../models/punto-di-ritiro';
import { OrdineService } from '../service/ordine.service';
import { TokenService } from '../service/token.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-dettaglio-punto-di-ritiro-ordine',
  templateUrl: './dettaglio-punto-di-ritiro-ordine.component.html',
  styleUrls: ['./dettaglio-punto-di-ritiro-ordine.component.css']
})
export class DettaglioPuntoDiRitiroOrdineComponent implements OnInit {

  isLogged = false;
  puntoDiRitiro:PuntoDiRitiro = null;

  constructor(private ordineService:OrdineService,private activatedRouter : ActivatedRoute ,private toastr:ToastrService ,private router : Router, private tokenService :TokenService , private location : Location) { }


  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    
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
      
    }

  }
  indietro():void
  {
    this.location.back();
  }


}