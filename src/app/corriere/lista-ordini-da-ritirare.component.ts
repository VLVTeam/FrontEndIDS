import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Ordine } from '../models/ordine';
import { OrdineService } from '../service/ordine.service';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-lista-ordini-da-ritirare',
  templateUrl: './lista-ordini-da-ritirare.component.html',
  styleUrls: ['./lista-ordini-da-ritirare.component.css']
})
export class ListaOrdiniDaRitirareComponent implements OnInit {
  isLogged = false;

  ordini: Ordine[] = [];

  dataPrevistaConsegna: Date;

  idOrdine: number;

  stringaData: string;
  constructor(private ordineService: OrdineService, private toastr: ToastrService, private tokenService: TokenService) { }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.caricaOrdiniDaRitirare();
    }
  }
  caricaOrdiniDaRitirare() {
    this.ordineService.listaOrdiniDaRitirare().subscribe(
      data => {
        this.ordini = data;
      },
      error => {
        console.log(error);
      }

    )
  }

  ritiraOrdine(): void {

    if (this.idOrdine == null) {
      this.toastr.error("ORDINE NON SELEZIONATO", "FAIL", {
        timeOut: 3000, positionClass: 'toast-top-center',
      });
    } else if (this.dataPrevistaConsegna == null) {
      this.toastr.error("DATA NON INSERITA", "FAIL", {
        timeOut: 3000, positionClass: 'toast-top-center',
      });
    }
    else {
    //  var dt = new Date(this.dataPrevistaConsegna);
   //  var dd = String(dt).padStart(2, '0');
   //   var MM = String(dt.getMonth() + 1).padStart(2, '0'); //January is 0!
  //    var yyyy = dt.getFullYear();
//     this.stringaData = yyyy + '/' + MM + '/' + dd;

      this.ordineService.setDataConsegnaPrevista(this.idOrdine, this.dataPrevistaConsegna).subscribe(
        data => {
          
          this.toastr.success(data.messaggio, "OK", {
            timeOut: 3000, positionClass: 'toast-top-center',
          });
          this.caricaOrdiniDaRitirare();
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
