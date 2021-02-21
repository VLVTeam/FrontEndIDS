import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NuovoCommerciante } from '../models/nuovo-commerciante';
import { AuthService } from '../service/auth.service';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-registro-commerciante',
  templateUrl: './registro-commerciante.component.html',
  styleUrls: ['./registro-commerciante.component.css']
})
export class RegistroCommercianteComponent implements OnInit {
  isRegister = false;


  isLogged = false;

  isRegisterFail: boolean = false;

  nuovoCommerciante: NuovoCommerciante;
  email: string;
  password: string;
  errMsg: string;

  categoriaMerceologica: string;
  indirizzoPuntoVendita: string;
  nomePuntoVendita: string;



  constructor(private tokenService: TokenService, private authService: AuthService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {

    if (this.tokenService.getToken()) {
      this.isLogged = true;
    }

  }

  onRegister(): void {
    this.nuovoCommerciante = new NuovoCommerciante(this.email, this.password, this.categoriaMerceologica, this.nomePuntoVendita, this.indirizzoPuntoVendita);
    this.authService.nuovoCommerciante(this.nuovoCommerciante).subscribe(
      data => {
        this.isRegister = true;
        this.isRegisterFail = false;

        this.toastr.success(data.messaggio, "OK", { timeOut: 3000, positionClass: 'toast-top-center' });
        this.router.navigate(['/login']);
      },
      err => {
        this.isRegister = false;
        this.isRegisterFail = true;
        this.errMsg = err.error.messaggio;
        this.toastr.error(this.errMsg, 'Fail', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });

      }
    );

  }

}
