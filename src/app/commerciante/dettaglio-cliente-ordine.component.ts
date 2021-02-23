import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NuovoUtente } from '../models/nuovo-utente';
import { OrdineService } from '../service/ordine.service';

@Component({
  selector: 'app-dettaglio-cliente-ordine',
  templateUrl: './dettaglio-cliente-ordine.component.html',
  styleUrls: ['./dettaglio-cliente-ordine.component.css']
})
export class DettaglioClienteOrdineComponent implements OnInit {

  cliente : NuovoUtente=null;
  constructor(private ordineService:OrdineService, private activatedRouter : ActivatedRoute ,private toastr:ToastrService ,private router : Router) { }

  ngOnInit(): void {
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

  indietro():void
  {
    this.router.navigate(['/listaOrdiniCommerciante']);
  }





}
