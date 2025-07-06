import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { IProducto } from '../interfaces/producto';
import { ICategoria } from '../interfaces/categoria';

@Injectable({
  providedIn: 'root'
})

export class Producto {
  private _endPoint: string = environment.endPoint;
  private _apiurlP: string = this._endPoint + "Products";

  constructor(private http: HttpClient) { }

  getList(): Observable<IProducto[]> {
    return this.http.get<IProducto[]>(`${this._apiurlP}`);
  }


}

@Injectable({
  providedIn: 'root'
})
export class Categoria {
  private _endPoint: string = environment.endPoint;
  private _apiurlC: string = this._endPoint + "Categorias";

  constructor(private http: HttpClient) { }

  getListC(): Observable<ICategoria[]> {
    return this.http.get<ICategoria[]>(`${this._apiurlC}`);
  }

}
