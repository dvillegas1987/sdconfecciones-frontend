import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Pedido } from '../models/Pedido';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  API_URI = 'https://sd-confecciones-backend.herokuapp.com/api';

  constructor(private http:HttpClient) { }


  getPedidos(id:number|string)
  {
    return this.http.get(`${this.API_URI}/pedidos/${id}/estado/filtro`);
  }

  getPedido(id:string)
  {
    return this.http.get(`${this.API_URI}/pedidos/${id}`);
  }

  savePedido(pedido:Pedido)
  {
    return this.http.post(`${this.API_URI}/pedidos`,pedido);
  }


  updatePedido(id:number|string,pedido:Pedido)
  {
    return this.http.put(`${this.API_URI}/pedidos/${id}`,pedido);
  }

  updateState(id:number|string,estado:number)
  {
    return this.http.get(`${this.API_URI}/pedidos/${id}/${estado}`);
  }



  deletePedido(id:number)
  {
    return this.http.delete(`${this.API_URI}/pedidos/${id}`);
  }

}
