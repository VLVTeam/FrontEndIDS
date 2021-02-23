import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PuntoDiRitiro } from '../models/punto-di-ritiro';
import { PuntoDiRitiroService } from '../service/punto-di-ritiro.service';

@Component({
  selector: 'app-nuovo-punto-di-ritiro',
  templateUrl: './nuovo-punto-di-ritiro.component.html',
  styleUrls: ['./nuovo-punto-di-ritiro.component.css']
})
export class NuovoPuntoDiRitiroComponent implements OnInit {


  indirizzo = '';
 
  constructor(private puntoDiRitiroService : PuntoDiRitiroService , private toastr : ToastrService , private router : Router) { }


    

  ngOnInit(): void {
  }

 



  onCreate(): void {
    const  puntoDiRitiro = new PuntoDiRitiro(this.indirizzo);
    this.puntoDiRitiroService.crea(puntoDiRitiro).subscribe(
      data => {
        console.log(data);
        this.toastr.success(data.messaggio, 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.router.navigate(['/listaPuntiDiRitiro']);
      },
      err => {
        console.log(err);
        this.toastr.error(err.error.text, err.error.text, {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
        // this.router.navigate(['/']);
      }
    );
  }




















}
