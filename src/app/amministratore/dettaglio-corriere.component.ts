import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NuovoCorriere } from '../models/nuovo-corriere';
import { CorriereService } from '../service/corriere.service';
import { TokenService } from '../service/token.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-dettaglio-corriere',
  templateUrl: './dettaglio-corriere.component.html',
  styleUrls: ['./dettaglio-corriere.component.css']
})
export class DettaglioCorriereComponent implements OnInit {

  isLogged = false;
  corriere: NuovoCorriere = null;

  constructor(private corriereService: CorriereService, private activatedRouter: ActivatedRoute, private toastr: ToastrService, private router: Router, private tokenService: TokenService , private location :Location) { }



  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      
      const id = this.activatedRouter.snapshot.params.id;
    this.corriereService.dettagliocorriere(id).subscribe(
      data => {
        this.corriere = data;
      },
      err => {
        console.log(err);
        this.toastr.error(err.error.message, 'Fail', { timeOut: 3000, positionClass: "toast-top-center" });
        this.indietro();
      }

    )
    }
    else {
      this.isLogged = false;
     
    }

  }

  indietro(): void {
   this.location.back();
  }

  vediDettaglio(): void {
    const id = this.activatedRouter.snapshot.params.id;

    this.corriereService.dettagliocorriere(id);
  }
}
