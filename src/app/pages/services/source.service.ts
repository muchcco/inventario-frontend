import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SourceService {


  private apiURL: string = environment.apiUrl
  constructor(private http: HttpClient) { }

  getAlmacenProductoTable():Observable<any> {
    return this.http.get<any>(`${this.apiURL}/productos`)
  }

  getProductosPaginados(page: number) {
    return this.http.get<any>(`${this.apiURL}/productos?page=${page}`);
  }  

  //insertamos el bien
  registrarProducto(data: any) {
    return this.http.post(`${this.apiURL}/productos`, data);
  }

  actualizarProducto(id: number, data: any) {
    return this.http.put<any>(`${this.apiURL}/productos/${id}`, data);
  }

  getUnidadesMedidaDesdeProducto() {
    return this.http.get<any>(`${this.apiURL}/unidades-medida`);
  }
  
  getFamiliaProducto() {
    return this.http.get<any>(`${this.apiURL}/familias`);
  }

  eliminarProducto(id: number) {
    return this.http.delete<any>(`${this.apiURL}/productos/${id}`);
  }

}
