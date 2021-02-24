import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Ordine } from '../models/ordine';
import { OrdineService } from '../service/ordine.service';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-lista-ordini-da-depositare',
  templateUrl: './lista-ordini-da-depositare.component.html',
  styleUrls: ['./lista-ordini-da-depositare.component.css']
})
export class ListaOrdiniDaDepositareComponent implements OnInit {
  isLogged = false;

  ordini: Ordine[] = [];

 

  

  constructor(private ordineService: OrdineService, private toastr: ToastrService, private tokenService: TokenService) { }

  ngOnInit(): void {

    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.caricaOrdiniInTransito();
    }
  }
  caricaOrdiniInTransito() {
    this.ordineService.listaOrdiniInTransito().subscribe(
      data => {
        this.ordini = data;
      },
      error => {
        console.log(error);
      }

    )
  }


  deposita(idOrdine:number)
  {
    this.ordineService.setOrdineProntoPerIlRitiro(idOrdine).subscribe(
      data => {
        
        this.toastr.success(data.messaggio, "OK", {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
        this.caricaOrdiniInTransito();
      },
      err => {
        console.log(err);
        this.toastr.error(err.error.messaggio, "FAIL", {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
      }

    )
  }



  consegna(idOrdine:number)
  {
    this.ordineService.setOrdineConsegnato(idOrdine).subscribe(
      data => {
        
        this.toastr.success(data.messaggio, "OK", {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
        this.caricaOrdiniInTransito();
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
