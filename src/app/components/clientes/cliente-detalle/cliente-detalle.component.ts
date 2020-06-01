import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA , MatDialogRef} from '@angular/material/dialog';

import { ClientesServiceService } from  '../../../services/clientes-service.service';

import { Cliente } from  '../../../models/Cliente';
@Component({
  selector: 'app-cliente-detalle',
  templateUrl: './cliente-detalle.component.html',
  styleUrls: ['./cliente-detalle.component.css']
})
export class ClienteDetalleComponent implements OnInit {

  cliente:Cliente;

  constructor(private clienteService:ClientesServiceService, @Inject(MAT_DIALOG_DATA)private data:any) { }

  ngOnInit(): void {
    if(this.data.codigo_cliente)
    {
      this.clienteService.getCliente(this.data.codigo_cliente).subscribe(
        res => {
          console.log(res);
          this.cliente = res;
        },
        err => console.error(err)
      )
    }
  }

}
