import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NuovoUtente } from '../models/nuovo-utente';
import { Ordine } from '../models/ordine';
import { PuntoDiRitiro } from '../models/punto-di-ritiro';
import { ClienteService } from '../service/cliente.service';
import { OrdineService } from '../service/ordine.service';
import { PuntoDiRitiroService } from '../service/punto-di-ritiro.service';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-nuovo-ordine',
  templateUrl: './nuovo-ordine.component.html',
  styleUrls: ['./nuovo-ordine.component.css']
})
export class NuovoOrdineComponent implements OnInit {

  constructor(private ordineService: OrdineService, private toastr: ToastrService, private router: Router, private tokenService: TokenService, private clienteService: ClienteService, private puntoDiRitiroService: PuntoDiRitiroService) { }

  isLogged = false;

  codiceRitiro: string;
  descrizione: string;
  idCliente: number;
  idPuntoDiRitiro: number;
  listaClienti: NuovoUtente[] = [];
  puntiDiRitiro: PuntoDiRitiro[] = [];

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.caricaListaClienti();
      this.caricaListaPuntiDiRitiro();
    }
    else {
      this.isLogged = false;
    }
  }

  caricaListaClienti() {
    this.clienteService.listaClienti().subscribe(
      data => {
        this.listaClienti = data;
      },
      error => {
        console.log(error);
      }

    )


  }

  caricaListaPuntiDiRitiro() {
    this.puntoDiRitiroService.lista().subscribe(
      data => {
        this.puntiDiRitiro = data;
      },
      error => {
        console.log(error);
      }

    )

  }

  onCreate(): void {
    if (this.idCliente == null) {
      this.toastr.error("CLIENTE NON SELEZIONATO", "ERRORE", {
        timeOut: 3000, positionClass: 'toast-top-center',
      });
    }
    else {

         const ordine = new Ordine(this.codiceRitiro, this.descrizione, this.idCliente,this.idPuntoDiRitiro);
         
      this.ordineService.addOrdine(ordine).subscribe(
        data => {
          console.log(data);
          this.toastr.success(data.messaggio, 'OK', {
            timeOut: 3000, positionClass: 'toast-top-center'
          });
          this.router.navigate(['/listaOrdiniCommerciante']);
        },
        err => {
          console.log(err);
          this.toastr.error(err.error.messaggio, err.error.messaggio, {
            timeOut: 3000, positionClass: 'toast-top-center',
          });

        }
      );
    }
  }

  selezionaCliente(idCliente: number) {
    if (idCliente != null) {
      this.idCliente = idCliente;
      this.toastr.success("CLIENTE SELEZIONATO", 'OK', {
        timeOut: 3000, positionClass: 'toast-top-center'
      });
    }
    else {
      this.toastr.error("CLIENTE NULLO", 'OK', {
        timeOut: 3000, positionClass: 'toast-top-center'
      });
    }
  }






  selezionaPuntoDiiritiro(idPuntoDiRitiro: number) {
    if (idPuntoDiRitiro != null) {
      this.idPuntoDiRitiro = idPuntoDiRitiro;
      this.toastr.success("PUNTO DI RITIRO SELEZIONATO", 'OK', {
        timeOut: 3000, positionClass: 'toast-top-center'
      });
    }
    else {
      this.toastr.error("PUNTO DI RITIRO NULLO", 'OK', {
        timeOut: 3000, positionClass: 'toast-top-center'
      });
    }
  }

}
