import { TokenizeResult } from '@angular/compiler/src/ml_parser/lexer';
import { Component, OnInit } from '@angular/core';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  isAmministratore = false;
  isCliente = false;
  isCommerciante = false; 
  isCorriere = false;
  ruolo = ''; 
  isLogged=false;
  constructor(private tokenService : TokenService) { }

  ngOnInit(): void {
    if(this.tokenService.getToken()){
      this.isLogged=true;
      if (this.tokenService.getAuthorities().includes('ROLE_AMMINISTRATORE')) {
        this.isAmministratore = true;
        this.isCliente = false;
        this.isCommerciante = false;
        this.isCorriere = false;
        this.ruolo = 'Amministratore';
      }
      else if (this.tokenService.getAuthorities().includes('ROLE_CLIENTE')) {
        this.isAmministratore = false;
        this.isCliente = true;
        this.isCommerciante = false;
        this.isCorriere = false;
        this.ruolo = 'Cliente';
      }
      else if (this.tokenService.getAuthorities().includes('ROLE_COMMERCIANTE')) {
        this.isAmministratore = false;
        this.isCliente = false;
        this.isCommerciante = true;
        this.isCorriere = false;
        this.ruolo = 'Commerciante';
      }
      else if (this.tokenService.getAuthorities().includes('ROLE_CORRIERE')) {
        this.isAmministratore = false;
        this.isCliente = false;
        this.isCommerciante = false;
        this.isCorriere = true;
        this.ruolo = 'Corriere';
      }
    }
    else {
      this.isLogged = false;
      this.ruolo = '';
      this.isAmministratore = false;
      this.isCliente = false;
      this.isCommerciante = false;
      this.isCorriere = false;
    }
    
  }
 

  onLogOut()
  {
    this.tokenService.logOut();
    window.location.reload();
  }
}
