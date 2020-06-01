import { Component, OnInit, ViewChild } from '@angular/core';

import { PedidosService } from '../../services/pedidos.service';

import {MatTableDataSource} from '@angular/material/table';
import { MatDialog,MatDialogConfig } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort'

import { Pedido } from '../../models/Pedido';

import { PedidoFormComponent } from '../../components/pedido-form/pedido-form.component';
import { DialogConfirmComponent } from '../../components/dialog-confirm/dialog-confirm.component';
import { TrabajoListComponent } from '../../components/trabajos/trabajo-list/trabajo-list.component';
import { TrabajoFormComponent } from '../../components/trabajos/trabajo-form/trabajo-form.component';

import {SelectionModel} from '@angular/cdk/collections';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pedido-list',
  templateUrl: './pedido-list.component.html',
  styleUrls: ['./pedido-list.component.css']
})
export class PedidoListComponent implements OnInit {

  @ViewChild(MatSort, {static: true}) sort: MatSort;


  pedidos:any = [];
  displayedTotalColumns = ['select','codigo','cliente','precio_total','estado','accion'];
  displayedColumns: string[] = ['select','codigo', 'cliente' , /*'fecha_pedido' /*, 'fecha_entrega',*/'precio_total',/*'forma_pago', */'estado','accion'];
  dataSource = new MatTableDataSource<any>();

  selection = new SelectionModel<Pedido>(true,[]);
 
  constructor(private pedidoService:PedidosService, private dialog:MatDialog, private activatedRoute:ActivatedRoute) { }

  titulo:string;

  ngOnInit(): void {

    const params = this.activatedRoute.snapshot.params;
    this.getPedidos(params.id);

    if(params.id == 0){
      this.titulo = 'GRILLA PENDIENTES';
    }else{
      if(params.id == 1){
        this.titulo = 'GRILLA ENTREGADOS';
      }else{
        this.titulo = 'GRILLA CANCELADOS';
      }
    }

  }

  openDialog()
  {
    const dialogConfigc = new MatDialogConfig(); //se declara la ventana emergente Dialog
    dialogConfigc.autoFocus = true; //asigna que se desenfoque el fondo
    dialogConfigc.width= "100%"; //asigna el ancho de la ventana emergente
    dialogConfigc.data = {
        codigo_juego:null,
    };

    let dialogRef = this.dialog.open(PedidoFormComponent,dialogConfigc);

    dialogRef.afterClosed().subscribe(result =>{
        const params = this.activatedRoute.snapshot.params;
        this.getPedidos(params.id);
    });
  }
  
  getPedidos(id:number|string){
    this.pedidoService.getPedidos(id).subscribe(
      res => {
        
          this.pedidos = res;
          this.dataSource.data = this.pedidos;
          this.dataSource.sort = this.sort;
      },
      err => console.error(err)
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  editPedido(id:string){

    const dialogConfigc = new MatDialogConfig(); //se declara la ventana emergente Dialog
    dialogConfigc.autoFocus = true; //asigna que se desenfoque el fondo
    dialogConfigc.width= "100%"; //asigna el ancho de la ventana emergente
    dialogConfigc.data = {
        codigo_juego: id,
    };
    let dialogRef = this.dialog.open(PedidoFormComponent,dialogConfigc);
    dialogRef.afterClosed().subscribe(result =>{
        const params = this.activatedRoute.snapshot.params;
        this.getPedidos(params.id);
    });
   
  }


  deletePedido(id:number)
  {

    const dialogConfigc = new MatDialogConfig(); //se declara la ventana emergente Dialog
    dialogConfigc.autoFocus = true; //asigna que se desenfoque el fondo
    dialogConfigc.width= "100%"; //asigna el ancho de la ventana emergente
    dialogConfigc.data = {
        mensaje: 'Está seguro de eliminar este juego?',
    };
    let dialogRef = this.dialog.open(DialogConfirmComponent,dialogConfigc);
    dialogRef.afterClosed().subscribe(result =>{

        if(result){
          this.pedidoService.deletePedido(id).subscribe(
            res => {
              console.log(res);
            },
            err => console.error(err)
          );
        }
    });  

    dialogRef.afterClosed().subscribe(result =>{
        const params = this.activatedRoute.snapshot.params;
        this.getPedidos(params.id);
    });
  }



  deletePedidoSelected(){

    const dialogConfigc = new MatDialogConfig(); //se declara la ventana emergente Dialog
    dialogConfigc.autoFocus = true; //asigna que se desenfoque el fondo
    dialogConfigc.width= "100%"; //asigna el ancho de la ventana emergente
    dialogConfigc.data = {
        mensaje: 'Está seguro de eliminar los juegos seleccionados?',
    };
    let dialogRef = this.dialog.open(DialogConfirmComponent,dialogConfigc);
    dialogRef.afterClosed().subscribe(result =>{

      if(result){
        this.dataSource.data.forEach(row => 
        {
            if(this.selection.isSelected(row)){
                this.pedidoService.deletePedido(row.codigo).subscribe(
                  res => {
                    console.log(res);
                  },
                  err => console.error(err)
                );
            }
        });
        
      }

      

    });  

    dialogRef.afterClosed().subscribe(result => {
      const params = this.activatedRoute.snapshot.params;
      this.getPedidos(params.id)
    });
  }




  listaTrabajosPorPedido(id:number|string,cliente:string,fecha_entrega:string,fecha_pedido:string,forma_pago:number){

    let fp = forma_pago == 0 ? 'Efectivo': forma_pago == 1? 'Débito':'Crédito';

    const dialogConfigc = new MatDialogConfig(); //se declara la ventana emergente Dialog
    dialogConfigc.autoFocus = true; //asigna que se desenfoque el fondo
    dialogConfigc.width= "100%"; //asigna el ancho de la ventana emergente
    dialogConfigc.data = {
        codigo_pedido: id,
        forma_pago:fp,
        cliente:cliente,
        fecha_entrega:fecha_entrega,
        fecha_pedido:fecha_pedido
    };
   let dialogRef = this.dialog.open(TrabajoListComponent,dialogConfigc);
   dialogRef.afterClosed().subscribe(result =>{
     const params = this.activatedRoute.snapshot.params;
     this.getPedidos(params.id);
   });
  
  }
  

  nuevoTrabajo(id:number|string,cliente:string)
  {
    const dialogConfigc = new MatDialogConfig(); //se declara la ventana emergente Dialog
    dialogConfigc.autoFocus = true; //asigna que se desenfoque el fondo
    dialogConfigc.width= "100%"; //asigna el ancho de la ventana emergente
    dialogConfigc.data = {
        codigo_pedido:id,
        cliente:cliente
    };

    let dialogRef = this.dialog.open(TrabajoFormComponent,dialogConfigc);

    dialogRef.afterClosed().subscribe(result =>{
        const params = this.activatedRoute.snapshot.params;
        this.getPedidos(params.id);
    });
  }


  //cancelar pedido
  cancelado()
  {
    this.cambioEstado(2);
  }

  pendiente()
  {
    this.cambioEstado(0);
  }

  entregado()
  {
    this.cambioEstado(1);
  }

  cambioEstado(estado)
  {

    const dialogConfigc = new MatDialogConfig(); //se declara la ventana emergente Dialog
    dialogConfigc.autoFocus = true; //asigna que se desenfoque el fondo
    dialogConfigc.width= "100%"; //asigna el ancho de la ventana emergente
    dialogConfigc.data = {
        mensaje: 'Está seguro de realizar esta acción?',
    };
    let dialogRef = this.dialog.open(DialogConfirmComponent,dialogConfigc);
    dialogRef.afterClosed().subscribe(result =>{
      if(result){
        this.dataSource.data.forEach(row => 
          {
              if(this.selection.isSelected(row)){

                this.pedidoService.updateState(row.codigo,estado).subscribe(
                  res => {
                    console.log(res);
                  },
                  err => console.error(err)
                );
              }
          });
      }
      const params = this.activatedRoute.snapshot.params;
      this.getPedidos(params.id);
    });  

    dialogRef.afterClosed().subscribe(result =>{
        const params = this.activatedRoute.snapshot.params;
        this.getPedidos(params.id);
    });
 
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
  checkboxLabel(row?: Pedido): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.codigo + 1}`;
  }



  getTotalCost() {
    return this.pedidos.map(t => t.precio_total).reduce((acc, value) => acc + value, 0);
  }



}
