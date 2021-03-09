import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Ordine } from '../models/ordine';
import { OrdineService } from '../service/ordine.service';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-lista-ordini-liberi',
  templateUrl: './lista-ordini-liberi.component.html',
  styleUrls: ['./lista-ordini-liberi.component.css']
})
export class ListaOrdiniLiberiComponent implements OnInit {


  isLogged = false;

  ordini: Ordine[] = [];

  dataPrevistaRitiro: Date;

  idOrdine: number;

  stringaData: string;

  

  constructor(private ordineService: OrdineService, private toastr: ToastrService, private tokenService: TokenService) { }

  ngOnInit(): void {

    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.caricaOrdiniLiberi();

     
    }
  }

  caricaOrdiniLiberi(): void {
    this.ordineService.listaOrdiniLiberi().subscribe(
      data => {
        this.ordini = data;
      },
      error => {
        console.log(error);
      }

    )
  }

  prendiInCarico(): void {

    if (this.idOrdine == null) {
      this.toastr.error("ORDINE NON SELEZIONATO", "FAIL", {
        timeOut: 3000, positionClass: 'toast-top-center',
      });
    } else if (this.dataPrevistaRitiro == null) {
      this.toastr.error("DATA NON INSERITA", "FAIL", {
        timeOut: 3000, positionClass: 'toast-top-center',
      });
    }
    else {
    //  var dt = new Date(this.dataPrevistaRitiro);
    // var dd = String(dt).padStart(2, '0');
     // var MM = String(dt.getMonth() + 1).padStart(2, '0'); //January is 0!
     // var yyyy = dt.getFullYear();
    //this.stringaData = yyyy + '-' + MM + '-' + dd;
  //    console.log(dt);
      this.ordineService.setPresaInCaricoOrdine(this.idOrdine, this.dataPrevistaRitiro).subscribe(
        data => {
          
          this.toastr.success(data.messaggio, "OK", {
            timeOut: 3000, positionClass: 'toast-top-center',
          });
          this.caricaOrdiniLiberi();
          
        },
        err => {
          console.log(err);
          this.toastr.error(err.error.messaggio, "FAIL", {
            timeOut: 3000, positionClass: 'toast-top-center',
          });
        }

      )
      
    }

  }



  selezionaOrdine(idOrdine:number)
  {

    this.idOrdine=idOrdine;


    this.toastr.success("ORDINE  SELEZIONATO", "OK", {
      timeOut: 3000, positionClass: 'toast-top-center',
    });
  }
}
