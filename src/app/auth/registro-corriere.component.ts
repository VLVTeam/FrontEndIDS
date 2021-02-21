import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NuovoCorriere } from '../models/nuovo-corriere';
import { AuthService } from '../service/auth.service';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-registro-corriere',
  templateUrl: './registro-corriere.component.html',
  styleUrls: ['./registro-corriere.component.css']
})
export class RegistroCorriereComponent implements OnInit {


  email: string;
  password: string;
  errMsg: string;

  nomeDitta: string;

  isRegister = false;

nuovoCorriere:NuovoCorriere;
  isLogged = false;

  isRegisterFail: boolean = false;



  constructor(private tokenService: TokenService, private authService: AuthService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;


    }
  }

  onRegister(): void {
    this.nuovoCorriere = new NuovoCorriere(this.email, this.password, this.nomeDitta);
    this.authService.nuovoCorriere(this.nuovoCorriere).subscribe(
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
