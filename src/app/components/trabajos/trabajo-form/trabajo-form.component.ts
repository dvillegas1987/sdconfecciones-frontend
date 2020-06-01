import { Component, OnInit, Inject } from '@angular/core';
import { TrabajosService } from '../../../services/trabajos/trabajos.service';
import { FormBuilder, FormGroup,Validators } from'@angular/forms';
import { Trabajo } from '../../../models/Trabajo';
import {MAT_DIALOG_DATA,MatDialogRef} from '@angular/material/dialog';
@Component({
  selector: 'app-trabajo-form',
  templateUrl: './trabajo-form.component.html',
  styleUrls: ['./trabajo-form.component.css']
})
export class TrabajoFormComponent implements OnInit {

  formTrabajo:FormGroup;

  trabajo:Trabajo = {
    codigo:0,
    pedido:null,
    descripcion:'',
    detalle:'',
    precio:''
  }

  edit:boolean=false;

  cliente:string;

  constructor(private dialogRef:MatDialogRef<Trabajo>,private formBuilder:FormBuilder,private trabajoService:TrabajosService,@Inject(MAT_DIALOG_DATA)public data:any) { }

  ngOnInit(): void {

    if(this.data.cliente)
    {
      this.cliente = this.data.cliente;
    }

    if(this.data.codigo_trabajo)
    {
      this.trabajoService.getTrabajo(this.data.codigo_trabajo).subscribe(
        res => {
          console.log(res);
          
          this.trabajo = res;
          this.edit = true;
        },
        err => console.error(err)
      )
    }

    this.formTrabajo = this.formBuilder.group({
        'descripcion':[this.trabajo.descripcion,[Validators.required]],
        'detalle':[this.trabajo.detalle],
        'precio':[]
    });


  }



  saveTrabajo(){
    delete this.trabajo.codigo;
    this.trabajo.pedido = this.data.codigo_pedido;
    this.trabajoService.saveTrabajo(this.trabajo).subscribe(
      res => {
          console.log(res);
          this.formTrabajo.reset();
          //this.dialogRef.close();
      },
      err => console.error(err)
    );
    
  }


  updateTrabajo(){
    this.trabajoService.updateTrabajo(this.trabajo.codigo,this.trabajo).subscribe(
      res => {
        console.log(res);
        this.formTrabajo.reset();
        this.dialogRef.close();
      },
      err => console.error(err)
    )
  }
 


  get descripcion(){
    return this.formTrabajo.get('descripcion');
  }

  get detalle(){
    return this.formTrabajo.get('detalle');
  }

  get precio(){
    return this.formTrabajo.get('precio');
  }

}
