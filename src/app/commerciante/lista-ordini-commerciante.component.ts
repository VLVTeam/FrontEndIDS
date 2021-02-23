import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Ordine } from '../models/ordine';
import { OrdineService } from '../service/ordine.service';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-lista-ordini-commerciante',
  templateUrl: './lista-ordini-commerciante.component.html',
  styleUrls: ['./lista-ordini-commerciante.component.css']
})
export class ListaOrdiniCommercianteComponent implements OnInit {
  isLogged = false;

  ordini:Ordine[]=[];

  constructor(private ordineService:OrdineService, private toastr: ToastrService, private tokenService: TokenService) { }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.caricaOrdiniCommerciante();
    }
  }


  caricaOrdiniCommerciante(): void {
    this.ordineService.listaOrdiniCommerciante().subscribe(
      data => {
        this.ordini = data;
      },
      error => {
        console.log(error);
      }

    )
  }
}
