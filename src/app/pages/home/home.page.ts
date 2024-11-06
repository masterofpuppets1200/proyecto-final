import { Component, OnInit } from '@angular/core';
import { CurdAPIService } from 'src/app/servicios/curd-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private crud:CurdAPIService) { }

  ngOnInit() {
  }

  obtener(){
    this.crud.obtener().subscribe(
      (resp)=>{
        console.log(resp)
      }
    )
  }
}
