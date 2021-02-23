import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NuovoCommerciante } from '../models/nuovo-commerciante';
import { CommercianteService } from '../service/commerciante.service';

@Component({
  selector: 'app-dettaglio-commerciante-promozione',
  templateUrl: './dettaglio-commerciante-promozione.component.html',
  styleUrls: ['./dettaglio-commerciante-promozione.component.css']
})
export class DettaglioCommerciantePromozioneComponent implements OnInit {


  commerciante : NuovoCommerciante = null;

  
  constructor(private commercianteService:CommercianteService , private activatedRouter : ActivatedRoute ,private toastr:ToastrService ,private router : Router) { }

  ngOnInit(): void {
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
  

indietro():void
{
  this.router.navigate(['/listaPromozioniCliente']);
}

}
