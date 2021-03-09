import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NuovoCommerciante } from '../models/nuovo-commerciante';
import{CommercianteService} from '../service/commerciante.service';
import { TokenService } from '../service/token.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-dettaglio-commerciante',
  templateUrl: './dettaglio-commerciante.component.html',
  styleUrls: ['./dettaglio-commerciante.component.css']
})
export class DettaglioCommercianteComponent implements OnInit {
  
  isLogged = false;
  commerciante : NuovoCommerciante = null;

  constructor(private commercianteService:CommercianteService , private activatedRouter : ActivatedRoute ,private toastr:ToastrService ,private router : Router , private tokenService:TokenService , private location:Location) { }

  
  
  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      
      const id = this.activatedRouter.snapshot.params.id;
    this.commercianteService.dettaglioCommerciante(id).subscribe(
      data => {
        this.commerciante = data;
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

  vediDettaglio() : void
  {
    const id = this.activatedRouter.snapshot.params.id;

    this.commercianteService.dettaglioCommerciante(id);
  }
}
