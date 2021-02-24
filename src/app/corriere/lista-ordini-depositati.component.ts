import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Ordine } from '../models/ordine';
import { OrdineService } from '../service/ordine.service';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-lista-ordini-depositati',
  templateUrl: './lista-ordini-depositati.component.html',
  styleUrls: ['./lista-ordini-depositati.component.css']
})
export class ListaOrdiniDepositatiComponent implements OnInit {
  isLogged = false;

  ordini: Ordine[] = [];
  constructor(private ordineService: OrdineService, private toastr: ToastrService, private tokenService: TokenService) { }

  ngOnInit(): void {
    
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.caricaOrdiniDepositati();
    }
  }
  caricaOrdiniDepositati() {
    this.ordineService.listaOrdiniDepositatiPuntoDiRitiro().subscribe(
      data => {
        this.ordini = data;
      },
      error => {
        console.log(error);
      }

    )
  }

}
