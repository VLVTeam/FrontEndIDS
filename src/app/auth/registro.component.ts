import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NuovoUtente } from '../models/nuovo-utente';
import { AuthService } from '../service/auth.service';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  nuovoUtente: NuovoUtente;
  email: string;
  password: string;
  errMsg: string;
  nome:string;
  cognome:string;
  indirizzo:string;
  isRegister = false;


  isLogged = false;
 
  isRegisterFail:boolean=false;

 
  constructor(private tokenService: TokenService, private authService: AuthService,private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    if(this.tokenService.getToken()){
      this.isLogged = true;
      

    }
  }




  onRegister():void{
    this.nuovoUtente = new NuovoUtente(this.email,this.password,this.nome,this.cognome,this.indirizzo);
    this.authService.nuovoCliente(this.nuovoUtente).subscribe(
      data =>{
        this.isRegister=true;
        this.isRegisterFail=false;
       
        this.toastr.success(data.messaggio, "OK", {timeOut:3000, positionClass: 'toast-top-center'});
        this.router.navigate(['/login']);
      },
      err =>{
        this.isRegister=false;
        this.isRegisterFail=true;
        this.errMsg= err.error.messaggio;
        this.toastr.error(this.errMsg, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
        
      }
    );
  }






}
