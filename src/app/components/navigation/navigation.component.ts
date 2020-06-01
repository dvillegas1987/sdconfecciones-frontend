import { Component, OnInit } from '@angular/core';
import {ThemePalette} from '@angular/material/core';
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor() { }
  activeLink:any;
  ngOnInit(): void {
    this.activeLink = this.links[0].label;
  }
  


  links = [
    {location:'clientes/',label:'Clientes'},
    {location:'pedidos-pendientes/0',label:'Pendientes'},
    {location:'pedidos-entregados/1',label:'Entregados'},
    {location:'pedidos-cancelados/2',label:'Cancelados'},
  ]

  //links = ['First', 'Second', 'Third'];
  //activeLink = this.links[0].label;
  background: ThemePalette = 'primary';

  toggleBackground() {
    this.background = this.background ? undefined : 'primary';
  }

}
