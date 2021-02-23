import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NuovoCorriere } from '../models/nuovo-corriere';
import { CorriereService } from '../service/corriere.service';
import { OrdineService } from '../service/ordine.service';

@Component({
  selector: 'app-dettaglio-corriere-ordine',
  templateUrl: './dettaglio-corriere-ordine.component.html',
  styleUrls: ['./dettaglio-corriere-ordine.component.css']
})
export class DettaglioCorriereOrdineComponent implements OnInit {

  corriere:NuovoCorriere=null;

  constructor(private ordineService:OrdineService, private corriereService:CorriereService,private activatedRouter : ActivatedRoute ,private toastr:ToastrService ,private router : Router) { }

  ngOnInit(): void {
    const id = this.activatedRouter.snapshot.params.id;
    this.corriereService.dettagliocorriere(id).subscribe(
      data => {
        this.corriere = data;
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
