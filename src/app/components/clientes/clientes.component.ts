import { Component, OnInit, Inject} from '@angular/core';

import { ClientesServiceService } from '../../services/clientes-service.service';
import { Cliente } from '../../models/Cliente';
import { Localidad } from '../../models/Localidad';

import {FormGroup,FormBuilder,Validators} from '@angular/forms';
import { MAT_DIALOG_DATA , MatDialogRef} from '@angular/material/dialog';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  
  
  cliente:Cliente = {
    codigo:0,
    razon_social:'',
    nombre:'',
    apellido:'',
    cuit_cuil:'',
    dni:'',
    telefono:'',
    direccion:'',
    correo_electronico:'',
    localidad:0,
    contorno_busto:'',
    largo_espalda:'',
    ancho_espalda:'',
    contorno_cuello:'',
    ancho_hombro:'',
    altura_busto:'',
    separacion_busto:'',
    largo_busto:'',
    contorno_cintura_sup:'',
    altura_cadera:'',
    contorno_cadera:'',
    contorno_cintura_inf:'',
    largo_total_pierna:'',
    rodilla:'',
    bota_manga:'',
    tiro:'',
    largo_manga:'',
    puno_manga_corta:'',
    puno_manga_larga:'',
    contorno_sisa:'',

  }

  localidades: Localidad[] = [];

  formCliente:FormGroup;
  edit:Boolean = false;
  panelOpenState = false;
  
  constructor(private dialogRef:MatDialogRef<Cliente>,private clienteService:ClientesServiceService, private formBuilder:FormBuilder, @Inject(MAT_DIALOG_DATA)private data:any ) { }

  ngOnInit(): void {

    if(this.data.codigo_cliente)
    {
      this.clienteService.getCliente(this.data.codigo_cliente).subscribe(
        res => {
          console.log(res);
          
          this.cliente = res;
          this.edit = true;
        },
        err => console.error(err)
      )
    }

    this.localidades = [
      {valor: 1, descripcion: 'Cipolletti'},
      {valor: 2, descripcion: 'Fernández Oro'},
      {valor: 3, descripcion: 'Allen'},
      {valor: 4, descripcion: 'Cinco Saltos'},
      {valor: 5, descripcion: 'Neuquen Capital'},
      {valor: 6, descripcion: 'Plottier'},
      {valor: 7, descripcion: 'Centenario'},
    ];

    this.formCliente = this.formBuilder.group({

        'razon_social':[this.cliente.razon_social,[]],
        'nombre':[this.cliente.nombre,[Validators.required]],
        'apellido':[this.cliente.apellido,[Validators.required]],
        'cuit_cuil':[this.cliente.cuit_cuil,[]],
        'dni':[this.cliente.dni,[Validators.required]],
        'telefono':[this.cliente.telefono,[Validators.required]],
        'direccion':[this.cliente.direccion,[Validators.required]],
        'correo_electronico':[this.cliente.correo_electronico,[]],
        'localidad':[this.cliente.localidad,[Validators.required]],
        'contorno_busto':[this.cliente.contorno_busto,[]],
        'largo_espalda':[this.cliente.largo_espalda,[]],
        'ancho_espalda':[this.cliente.ancho_espalda,[]],
        'contorno_cuello':[this.cliente.contorno_cuello,[]],
        'ancho_hombro':[this.cliente.ancho_hombro,[]],
        'altura_busto':[this.cliente.altura_busto,[]],
        'separacion_busto':[this.cliente.separacion_busto,[]],
        'largo_busto':[this.cliente.largo_busto,[]],
        'contorno_cintura_sup':[this.cliente.contorno_cintura_sup,[]],
        'altura_cadera':[this.cliente.altura_cadera,[]],
        'contorno_cadera':[this.cliente.contorno_cadera,[]],
        'contorno_cintura_inf':[this.cliente.contorno_cintura_inf,[]],
        'largo_total_pierna':[this.cliente.largo_total_pierna,[]],
        'rodilla':[this.cliente.rodilla,[]],
        'bota_manga':[this.cliente.bota_manga,[]],
        'tiro':[this.cliente.tiro,[]],
        'largo_manga':[this.cliente.largo_manga,[]],
        'puno_manga_corta':[this.cliente.puno_manga_corta,[]],
        'puno_manga_larga':[this.cliente.puno_manga_larga,[]],
        'contorno_sisa':[this.cliente.contorno_sisa,[]],

    });

  }


  saveCliente(){
    delete this.cliente.codigo;
    this.clienteService.saveCliente(this.cliente).subscribe(
        res => {
          this.formCliente.reset();
          console.log(res);
        },
        err => console.error(err)
    );
  }


  updateCliente(){
    this.clienteService.updateCliente(this.cliente.codigo,this.cliente).subscribe(
      res => {
        this.formCliente.reset();
        this.dialogRef.close();
      },
      err => console.error(err)
    );
  }


  get apellido(){
    return this.formCliente.get('apellido');
  }

  get nombre(){
    return this.formCliente.get('nombre');
  }

  get direccion(){
    return this.formCliente.get('direccion');
  }

  get cuit_cuil(){
    return this.formCliente.get('cuit_cuil');
  }

  get dni(){
    return this.formCliente.get('dni');
  }

  get telefono(){
    return this.formCliente.get('telefono');
  }
  

}
