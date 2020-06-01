import { Component, OnInit, ViewChild } from '@angular/core';

import { ClientesComponent } from '../clientes.component';
import { ClienteDetalleComponent } from '../cliente-detalle/cliente-detalle.component';
import { DialogConfirmComponent } from '../../dialog-confirm/dialog-confirm.component';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog,MatDialogConfig } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort'

import {Cliente} from '../../../models/Cliente';

import { ClientesServiceService } from '../../../services/clientes-service.service';

import {SelectionModel} from '@angular/cdk/collections';

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css']
})
export class ClienteListComponent implements OnInit {

  @ViewChild(MatSort, {static: true}) sort: MatSort;


  clientes:any = [];

  displayedColumns: string[] = ['select','codigo','nombre','apellido','telefono','accion'];
  dataSource = new MatTableDataSource<any>();

  selection = new SelectionModel<Cliente>(true,[]);
 
  constructor(private clienteService:ClientesServiceService, private dialog:MatDialog) { }

  ngOnInit(): void {
    this.getClientes();
  }


  saveCliente()
  {
    const dialogConfigc = new MatDialogConfig(); //se declara la ventana emergente Dialog
    dialogConfigc.autoFocus = true; //asigna que se desenfoque el fondo
    dialogConfigc.width= "100%"; //asigna el ancho de la ventana emergente
    dialogConfigc.maxHeight=window.innerHeight + 'px';
    dialogConfigc.data = {
        codigo_cliente:null,
    };

    let dialogRef = this.dialog.open(ClientesComponent,dialogConfigc);

    dialogRef.afterClosed().subscribe(result =>{
        this.getClientes();
    });
  }
  
  getClientes(){
    this.clienteService.getClientes().subscribe(
      res => {
        
          this.clientes = res;
          this.dataSource.data = this.clientes;
          this.dataSource.sort = this.sort;
      },
      err => console.error(err)
    );
  }

  getCliente(id:number|string){
    const dialogConfigc = new MatDialogConfig(); //se declara la ventana emergente Dialog
    dialogConfigc.autoFocus = true; //asigna que se desenfoque el fondo
    dialogConfigc.width= "100%"; //asigna el ancho de la ventana emergente
    dialogConfigc.maxHeight=window.innerHeight + 'px';
    dialogConfigc.data = {
        codigo_cliente: id,
    };
    let dialogRef = this.dialog.open(ClienteDetalleComponent,dialogConfigc);
   
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  editCliente(id:string){

    const dialogConfigc = new MatDialogConfig(); //se declara la ventana emergente Dialog
    dialogConfigc.autoFocus = true; //asigna que se desenfoque el fondo
    dialogConfigc.width= "100%"; //asigna el ancho de la ventana emergente
    dialogConfigc.maxHeight=window.innerHeight + 'px';
    dialogConfigc.data = {
        codigo_cliente: id,
    };
    let dialogRef = this.dialog.open(ClientesComponent,dialogConfigc);
    dialogRef.afterClosed().subscribe(result =>{
        this.getClientes();
    });
   
  }


  deleteCliente(id:number)
  {

    const dialogConfigc = new MatDialogConfig(); //se declara la ventana emergente Dialog
    dialogConfigc.autoFocus = true; //asigna que se desenfoque el fondo
    dialogConfigc.width= "100%"; //asigna el ancho de la ventana emergente
    dialogConfigc.data = {
        mensaje: 'Está seguro de eliminar este cliente?',
    };
    let dialogRef = this.dialog.open(DialogConfirmComponent,dialogConfigc);
    dialogRef.afterClosed().subscribe(result =>{

        if(result){
          this.clienteService.deleteCliente(id).subscribe(
            res => {
              console.log(res);
            },
            err => console.error(err)
          );
        }
    });  

    dialogRef.afterClosed().subscribe(result =>{
        this.getClientes();
    });
  }



  deleteClienteSelected(){

    const dialogConfigc = new MatDialogConfig(); //se declara la ventana emergente Dialog
    dialogConfigc.autoFocus = true; //asigna que se desenfoque el fondo
    dialogConfigc.width= "100%"; //asigna el ancho de la ventana emergente
    dialogConfigc.data = {
        mensaje: 'Está seguro de eliminar los items seleccionados?',
    };
    let dialogRef = this.dialog.open(DialogConfirmComponent,dialogConfigc);
    dialogRef.afterClosed().subscribe(result =>{

      if(result){
        this.dataSource.data.forEach(row => 
        {
            if(this.selection.isSelected(row)){
                this.clienteService.deleteCliente(row.codigo).subscribe(
                  res => {
                    console.log(res);
                  },
                  err => console.error(err)
                );
            }
        });
        
      }

      

    });  

    dialogRef.afterClosed().subscribe(result => this.getClientes());
  }



  //CHECKBOXES

   /** Whether the number of selected elements matches the total number of rows. */
   isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Cliente): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.codigo + 1}`;
  }



  getTotalCost() {
    return this.clientes.map(t => t.precio_total).reduce((acc, value) => acc + value, 0);
  }

}
