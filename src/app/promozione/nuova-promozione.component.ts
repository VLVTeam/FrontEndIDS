import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Promozione } from '../models/promozione';
import { PromozioneService } from '../service/promozione.service';

@Component({
  selector: 'app-nuova-promozione',
  templateUrl: './nuova-promozione.component.html',
  styleUrls: ['./nuova-promozione.component.css']
})
export class NuovaPromozioneComponent implements OnInit {

  descrizione = '';
  dataInizio :Date ;
  dataFine : Date ;
  constructor(private promozioneService:PromozioneService , private toastr : ToastrService , private router : Router) { }

  ngOnInit(): void {
  }


  onCreate(): void {
    const  promozione = new Promozione(this.descrizione,this.dataInizio,this.dataFine);
    this.promozioneService.addPromozione(promozione).subscribe(
      data => {
        console.log(data);
        this.toastr.success(data.messaggio, 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.router.navigate(['/listaPromozioniCommerciante']);
      },
      err => {
        console.log(err);
        this.toastr.error(err.error.messaggio, err.error.messaggio, {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
       
      }
    );
  }
}
