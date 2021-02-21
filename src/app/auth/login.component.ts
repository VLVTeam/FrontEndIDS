import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginUtente } from '../models/login-utente';
import { AuthService } from '../service/auth.service';
import { TokenService } from '../service/token.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLogged:boolean=false;
  isLoginFail:boolean=false;
  loginUtente : LoginUtente;
  email : string;
  password : string;
  roles :string[]=[];
  errMsg : string;
  constructor( private tokenService:TokenService,private authService : AuthService,private router:Router,    private toastr: ToastrService    ) {}
   
    
    

  ngOnInit(): void {

    if(this.tokenService.getToken()){
      this.isLogged = true;
      this.isLoginFail=false;
      this.roles=this.tokenService.getAuthorities();

    }
  }


  onLogin():void{
    this.loginUtente = new LoginUtente(this.email,this.password);
    this.authService.login(this.loginUtente).subscribe(
      data =>{
        this.isLogged=true;
        
        this.toastr.success('Benvenuto '+ data.email, 'OK', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
        this.tokenService.setToken(data.token);
        this.tokenService.setUserName(data.email);
        this.tokenService.setAuthorities(data.authorities);
        this.roles=data.authorities;
        this.router.navigate(['/']);
      },
      err =>{
        this.isLogged=false;
        
        this.errMsg= err.error.message;
        this.toastr.error(this.errMsg, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
        
      }
    );
  }
}
