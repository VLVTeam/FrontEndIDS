import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PuntoDiRitiro } from '../models/punto-di-ritiro';
import { OrdineService } from '../service/ordine.service';

@Component({
  selector: 'app-dettaglio-punto-di-ritiro-ordine',
  templateUrl: './dettaglio-punto-di-ritiro-ordine.component.html',
  styleUrls: ['./dettaglio-punto-di-ritiro-ordine.component.css']
})
export class DettaglioPuntoDiRitiroOrdineComponent implements OnInit {

  puntoDiRitiro:PuntoDiRitiro = null;

  constructor(private ordineService:OrdineService,private activatedRouter : ActivatedRoute ,private toastr:ToastrService ,private router : Router) { }

  ngOnInit(): void {
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

  indietro():void
  {
    this.router.navigate(['/listaOrdiniCommerciante']);
  }


}