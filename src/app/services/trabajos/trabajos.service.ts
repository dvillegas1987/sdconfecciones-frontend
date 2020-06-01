import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Trabajo } from '../../models/Trabajo';

@Injectable({
  providedIn: 'root'
})
export class TrabajosService {

  constructor(private http:HttpClient) { }

  API_URI = 'https://sd-confecciones-backend.herokuapp.com/api';

  getTrabajos()
  {
    return this.http.get(`${this.API_URI}/trabajos`);
  }

  getTrabajosPorPedido(id:number|string,pedido:string)
  {
    return this.http.get(`${this.API_URI}/trabajos/${id}/${pedido}`);
  }

  getTrabajo(id:number|string)
  {
    return this.http.get(`${this.API_URI}/trabajos/${id}`);
  }

  saveTrabajo(trabajo:Trabajo)
  {
    return this.http.post(`${this.API_URI}/trabajos`,trabajo);
  }

  deleteTrabajo(id:number|string)
  {
    return this.http.delete(`${this.API_URI}/trabajos/${id}`);
  }

  updateTrabajo(id:number|string,trabajo:Trabajo)
  {
    return this.http.put(`${this.API_URI}/trabajos/${id}`,trabajo);
  }

}


