import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Promozione } from '../models/promozione';
import { PromozioneService } from '../service/promozione.service';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-lista-promozioni',
  templateUrl: './lista-promozioni.component.html',
  styleUrls: ['./lista-promozioni.component.css']
})
export class ListaPromozioniComponent implements OnInit {

  isLogged = false;
  promozioni :Promozione[] = [];

  constructor(private promozioneService:PromozioneService , private toastr: ToastrService, private tokenService: TokenService) { }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.caricaPromozioniCommerciante();
    }
  }


  caricaPromozioniCommerciante(): void {
    this.promozioneService.listaPromozioniCommerciante().subscribe(
      data => {
        this.promozioni = data;
      },
      error => {
        console.log(error);
      }

    )
  }

  elimina(id: number): void {
    this.promozioneService.rimuoviPromozione(id).subscribe(
      data => {
        console.log(data);
        this.toastr.success(data.messaggio, "OK", { timeOut: 3000, positionClass: 'toast-top-center' });

        this.caricaPromozioniCommerciante();
      },

      err => {
        console.log(err);
        this.toastr.error(err.error.message, 'Fail', { timeOut: 3000, positionClass: "toast-top-center" });

      }
    )
  }

}
