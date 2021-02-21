import { Component, OnInit } from '@angular/core';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  isLogged = false;
  email = '';

  isAmministratore = false;
  isCliente = false;
  isCommerciante = false; 
  isCorriere = false;
  constructor(private tokenService: TokenService) { }
  ruolo = '';
  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.email = this.tokenService.getUserName();

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
      this.email = '';
      this.ruolo = '';
      this.isAmministratore = false;
      this.isCliente = false;
      this.isCommerciante = false;
      this.isCorriere = false;
    }
  }

}
