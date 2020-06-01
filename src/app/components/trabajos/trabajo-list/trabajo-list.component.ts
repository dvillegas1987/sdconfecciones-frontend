import { Component, OnInit, Inject } from '@angular/core';
import { TrabajosService } from '../../../services/trabajos/trabajos.service';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog,MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {DialogConfirmComponent } from '../../../components/dialog-confirm/dialog-confirm.component';
import { TrabajoFormComponent } from '../../../components/trabajos/trabajo-form/trabajo-form.component';
@Component({
  selector: 'app-trabajo-list',
  templateUrl: './trabajo-list.component.html',
  styleUrls: ['./trabajo-list.component.css']
})
export class TrabajoListComponent implements OnInit {

  constructor(private trabajoService:TrabajosService,private dialog:MatDialog,@Inject(MAT_DIALOG_DATA)public data:any) { }

  trabajos:any = [];

  displayedColumns: string[] = ['codigo', 'descripcion' , 'detalle', 'precio','accion'];
  dataSource = new MatTableDataSource<any>();

  fp:string;
  fpe:string;
  fen:string;
  cli:string;

  ngOnInit(): void {

    this.fp= this.data.forma_pago != '' ? this.data.forma_pago:'';
    this.fpe = this.data.fecha_pedido != '' ? this.data.fecha_pedido:'';
    this.fen= this.data.fecha_entrega != '' ? this.data.fecha_entrega:'';
    this.cli= this.data.cliente != '' ? this.data.cliente:'';

    if(this.data.codigo_pedido)
    {
      this.trabajoService.getTrabajosPorPedido(this.data.codigo_pedido,'porpedido').subscribe(
        res => {
          
            this.trabajos = res;
            this.dataSource.data = this.trabajos;
        },
        err => console.error(err)
      );
    }else{
       this.getTrabajos();
    }
  }

  step = 0;

  setStep(index: number) {
    this.step = index;
  }


  getTrabajos(){
    this.trabajoService.getTrabajos().subscribe(
      res => {
        
          this.trabajos = res;
          this.dataSource.data = this.trabajos;
      },
      err => console.error(err)
    );
  }


  getTp()
  {
    if(this.data.codigo_pedido)
    {
      this.trabajoService.getTrabajosPorPedido(this.data.codigo_pedido,'porpedido').subscribe(
        res => {
          
            this.trabajos = res;
            this.dataSource.data = this.trabajos;
        },
        err => console.error(err)
      );
    }else{
       this.getTrabajos();
    }
  }


  deleteTrabajo(id:number)
  {

    const dialogConfigc = new MatDialogConfig(); //se declara la ventana emergente Dialog
    dialogConfigc.autoFocus = true; //asigna que se desenfoque el fondo
    //dialogConfigc.width= "20%"; //asigna el ancho de la ventana emergente
    dialogConfigc.data = {
        mensaje: 'Está seguro de eliminar este trabajo?',
    };
    let dialogRef = this.dialog.open(DialogConfirmComponent,dialogConfigc);
    dialogRef.afterClosed().subscribe(result =>{

        if(result){
          this.trabajoService.deleteTrabajo(id).subscribe(
            res => {
              console.log(res);
            },
            err => console.error(err)
          );
        }
        this.getTp();
    });  

    dialogRef.afterClosed().subscribe(result =>{
      this.getTp();
    });
  }


  editTrabajo(id:string){

    const dialogConfigc = new MatDialogConfig(); //se declara la ventana emergente Dialog
    dialogConfigc.autoFocus = true; //asigna que se desenfoque el fondo
    //dialogConfigc.width= "30%"; //asigna el ancho de la ventana emergente
    dialogConfigc.data = {
        codigo_trabajo: id,
    };
    let dialogRef = this.dialog.open(TrabajoFormComponent,dialogConfigc);
    dialogRef.afterClosed().subscribe(result =>{
      this.getTp();
    });
   
  }


}
