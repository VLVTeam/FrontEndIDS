import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Ordine } from '../models/ordine';
import { OrdineService } from '../service/ordine.service';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-lista-ordini-cliente',
  templateUrl: './lista-ordini-cliente.component.html',
  styleUrls: ['./lista-ordini-cliente.component.css']
})
export class ListaOrdiniClienteComponent implements OnInit {

  isLogged = false;

  ordini:Ordine[]=[];
  idOrdine:number;
  codiceRitiro:string;
  constructor(private ordineService:OrdineService, private toastr: ToastrService, private tokenService: TokenService) { }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.caricaOrdiniCliente();
    }
  }


  caricaOrdiniCliente(): void {
    this.ordineService.listaOrdiniCliente().subscribe(
      data => {
        this.ordini = data;
      },
      error => {
        console.log(error);
      }

    )
  }

selezionaOrdine(idOrdine:number)
{
  this.idOrdine=idOrdine;
  this.toastr.success("ORDINE SELEZIONATO", 'OK', {
    timeOut: 3000, positionClass: 'toast-top-center'
  });
 
}


ritiraOrdine( ){
if(this.idOrdine ==null)
{
  this.toastr.error("ORDINE NON SELEZIONATO", "FAIL", {
    timeOut: 3000, positionClass: 'toast-top-center',
  });
  this.caricaOrdiniCliente();
}
else{

  this.ordineService.ritiraOrdine(this.idOrdine,this.codiceRitiro).subscribe(
    data => {
      this.toastr.success(data.messaggio, 'OK', {
        timeOut: 3000, positionClass: 'toast-top-center'
      });
    },
    err => {
      this.toastr.error(err.error.messaggio, err.error.messaggio, {
        timeOut: 3000, positionClass: 'toast-top-center',
      });
    }

  )

}
}
}
