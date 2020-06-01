import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PedidoListComponent} from './components/pedido-list/pedido-list.component';
import { PedidoFormComponent } from './components/pedido-form/pedido-form.component';

import { ClienteListComponent } from './components/clientes/cliente-list/cliente-list.component';

const routes: Routes = [
  {path:'', redirectTo:'/clientes',pathMatch:'full',data: {animation: 'Home'}},
 // {path:'pedidos', component:PedidoListComponent,data: {animation: 'Pedido'}},
  {path:'pedidos-pendientes/:id', component:PedidoListComponent,data: {animation: 'PedidoPendiente'}},
  {path:'pedidos-entregados/:id', component:PedidoListComponent,data: {animation: 'PedidoEntregado'}},
  {path:'pedidos-cancelados/:id', component:PedidoListComponent,data: {animation: 'PedidoCancelado'}},
  {path:'clientes', component:ClienteListComponent,data: {animation: 'Cliente'},},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
