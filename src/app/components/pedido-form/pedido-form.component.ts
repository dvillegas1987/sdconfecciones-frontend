import { Component, OnInit,Inject} from '@angular/core';
import { PedidosService } from '../../services/pedidos.service';
import { ClientesServiceService } from '../../services/clientes-service.service';
import { Pedido } from '../../models/Pedido';
import { FormBuilder,FormGroup,Validators, Form } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog,MatDialogConfig } from '@angular/material/dialog';

import { TrabajoFormComponent } from '../../components/trabajos/trabajo-form/trabajo-form.component';

interface FormaPago {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-pedido-form',
  templateUrl: './pedido-form.component.html',
  styleUrls: ['./pedido-form.component.css']
})
export class PedidoFormComponent implements OnInit {
  

  formasPago: FormaPago[] = [
    {value: 0, viewValue: 'Efectivo'},
    {value: 1, viewValue: 'Débito'},
    {value: 2, viewValue: 'Crédito'}
  ];


  clientes:any = [];

  pedido:Pedido = {
    codigo:0,
    cliente:null,
    //fecha_pedido:new Date("2018-03-16"),
    fecha_entrega:null,
    estado:0,
    precio_total:'',
    forma_pago:0,
  }

 // trabajo:string;

  edit:boolean=false;

  pedidoForm:FormGroup;

  reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

  constructor(private dialog:MatDialog,private formBuilder:FormBuilder,private clienteService:ClientesServiceService,private pedidoService:PedidosService,private dialogRef:MatDialogRef<Pedido>,@Inject(MAT_DIALOG_DATA)public data:any )
  {
    this.getClientes();
  }

  ngOnInit(): void {

    if(this.data.codigo_juego)
    {
      this.pedidoService.getPedido(this.data.codigo_juego).subscribe(
        res => {
          console.log(res);
          
          this.pedido = res;
          this.edit = true;
        },
        err => console.error(err)
      )
    }


    this.pedidoForm = this.formBuilder.group({
        'cliente':[this.pedido.cliente,[Validators.required] ],
        'forma_pago': [this.pedido.forma_pago,[Validators.required]],
        //'trabajos': [this.trabajo,[Validators.required]],
        //'precio_total': [this.pedido.precio_total,[Validators.required]],
        //'fecha_entrega': [this.fecha_entrega,[Validators.required]]
    });

  }


 
  savePedido(){
    delete this.pedido.codigo;
    delete this.pedido.fecha_entrega;

    this.pedidoService.savePedido(this.pedido).subscribe(
      res => {
          console.log(res);
          this.pedidoForm.reset();
          this.dialogRef.close();


          const dialogConfigc = new MatDialogConfig(); //se declara la ventana emergente Dialog
          dialogConfigc.autoFocus = true; //asigna que se desenfoque el fondo
          dialogConfigc.width= "100%"; //asigna el ancho de la ventana emergente
          dialogConfigc.data = {
              codigo_pedido:res['codigo_pedido'],
          };
          this.dialog.open(TrabajoFormComponent,dialogConfigc);

         
      },
      err => console.error(err)
    );
    
  }


  updatePedido(){
    delete this.pedido.fecha_entrega;
    delete this.pedido.fecha_pedido;
    this.pedidoService.updatePedido(this.data.codigo_juego,this.pedido).subscribe(
      res => {
        console.log(res);
        this.pedidoForm.reset();
        this.dialogRef.close();
      },
      err => console.error(err)
    )
  }



  getClientes(){
    this.clienteService.getClientes().subscribe(
      res => {
        this.clientes = res;
      },
      err => console.error(err)
    );
  }











  //getters and setters
  get cliente(){
    return this.pedidoForm.get('cliente');
  }

  get fecha_entrega(){
    return this.pedidoForm.get('fecha_entrega');
  }

  get precio_total(){
    return this.pedidoForm.get('precio_total');
  }

  get forma_pago(){
    return this.pedidoForm.get('forma_pago');
  }


  get trabajos(){
    return this.pedidoForm.get('trabajo');
  }

}
