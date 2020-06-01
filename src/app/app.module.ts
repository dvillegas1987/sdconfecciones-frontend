import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PedidoFormComponent } from './components/pedido-form/pedido-form.component';
import { PedidoListComponent } from './components/pedido-list/pedido-list.component';
import { NavigationComponent } from './components/navigation/navigation.component';

import { MaterialModule } from  './material.module';

import { PedidosService } from './services/pedidos.service';
import { DialogConfirmComponent } from './components/dialog-confirm/dialog-confirm.component';
import { TrabajoFormComponent } from './components/trabajos/trabajo-form/trabajo-form.component';
import { TrabajoListComponent } from './components/trabajos/trabajo-list/trabajo-list.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { ClienteListComponent } from './components/clientes/cliente-list/cliente-list.component';
import { ClienteDetalleComponent } from './components/clientes/cliente-detalle/cliente-detalle.component';
import { PedidoListEntregadosComponent } from './components/pedido-list-entregados/pedido-list-entregados.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    PedidoFormComponent,
    PedidoListComponent,
    NavigationComponent,
    DialogConfirmComponent,
    TrabajoFormComponent,
    TrabajoListComponent,
    ClientesComponent,
    ClienteListComponent,
    ClienteDetalleComponent,
    PedidoListEntregadosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [PedidosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
