import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Ordine } from '../models/ordine';
import { OrdineService } from '../service/ordine.service';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-lista-ordini-consegnati',
  templateUrl: './lista-ordini-consegnati.component.html',
  styleUrls: ['./lista-ordini-consegnati.component.css']
})
export class ListaOrdiniConsegnatiComponent implements OnInit {
  isLogged = false;

  ordini: Ordine[] = [];
  constructor(private ordineService: OrdineService, private toastr: ToastrService, private tokenService: TokenService) { }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.caricaOrdiniConsegnati();
    }
  }
  caricaOrdiniConsegnati() {
    this.ordineService.listaOrdiniConsegnati().subscribe(
      data => {
        this.ordini = data;
      },
      error => {
        console.log(error);
      }

    )
  
  }

}
