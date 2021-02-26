import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NuovoCommerciante } from '../models/nuovo-commerciante';
import { CommercianteService } from '../service/commerciante.service';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-lista-commercianti',
  templateUrl: './lista-commercianti.component.html',
  styleUrls: ['./lista-commercianti.component.css']
})
export class ListaCommerciantiComponent implements OnInit {

  constructor(private commercianteService: CommercianteService, private toastr: ToastrService, private tokenService: TokenService) { }

  commercianti: NuovoCommerciante[] = [];


  ngOnInit(): void {

    this.caricaCommercianti();
  }





  caricaCommercianti(): void {
    this.commercianteService.listaCommercianti().subscribe(
      data => {
        this.commercianti = data;
      },
      error => {
        console.log(error);
      }

    )
  }
}
