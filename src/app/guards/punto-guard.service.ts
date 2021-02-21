import { Route } from '@angular/compiler/src/core';
import { Token } from '@angular/compiler/src/ml_parser/lexer';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../service/token.service';

@Injectable({
  providedIn: 'root'
})
export class PuntoGuardService implements CanActivate{

  realRol:string;

  constructor(private tokenService :  TokenService , private router : Router) { }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const expectedRol = route.data.expectedRol;
    const roles = this.tokenService.getAuthorities();
    this.realRol = '';
    roles.forEach(rol => {
      if(rol === 'ROLE_AMMINISTRATORE'){
        this.realRol='amministratore';
      }
      if(rol === 'ROLE_CLIENTE'){
        this.realRol='cliente';
      }
      if(rol === 'ROLE_COMMERCIANTE'){
        this.realRol='commerciante';
      }
      if(rol === 'ROLE_CORRIERE'){
        this.realRol='corriere';
      }
    });
    if (!this.tokenService.getToken() || expectedRol.indexOf(this.realRol) === -1) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
