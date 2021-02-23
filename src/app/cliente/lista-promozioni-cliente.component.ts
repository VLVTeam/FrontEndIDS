import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Promozione } from '../models/promozione';
import { PromozioneService } from '../service/promozione.service';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-lista-promozioni-cliente',
  templateUrl: './lista-promozioni-cliente.component.html',
  styleUrls: ['./lista-promozioni-cliente.component.css']
})
export class ListaPromozioniClienteComponent implements OnInit {
  isLogged = false;
  promozioni :Promozione[] = [];
  constructor(private promozioneService:PromozioneService , private toastr: ToastrService, private tokenService: TokenService ) { }
  categoriaMerceologica:string;
  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.caricaPromozioniCliente();
    }
  }
  caricaPromozioniCliente() {
    this.promozioneService.listaPromozioniNonScadute().subscribe(
      data => {
        this.promozioni = data;
      },
      error => {
        console.log(error);
      }

    )
    }


    filtraPromozioniCliente()
    {
      if(this.categoriaMerceologica==null) {this.toastr.error("SELEZIONA CATEGORIA MERCEOLOGICA", 'Fail', { timeOut: 3000, positionClass: "toast-top-center" });}
      else{
      this.promozioneService.listaPromozioniFiltrate(this.categoriaMerceologica).subscribe(
        data => {
          this.promozioni = data;
        },
        error => {
          console.log(error);
        }
  
      )
      }
    }
}
