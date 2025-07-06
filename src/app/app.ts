import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { IProducto } from './interfaces/producto';
import { Producto } from './services/producto';
import { Categoria } from './services/producto';
import { ICategoria } from './interfaces/categoria';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  constructor(private _productoService: Producto, private _categoriaService: Categoria) {
    this.ObtenerProductos();
    this.ObtenerCategorias();
  }

  ObtenerProductos() {
    this._productoService.getList().subscribe({
      next: (data) => {
        console.log('Productos obtenidos:', data);
      }, error: (e) => { console.log(e) }
    });
  }

  ObtenerCategorias() {
    this._categoriaService.getListC().subscribe({
      next: (data) => {
        console.log('Categorías obtenidas:', data);
      }, error: (e) => { 
        console.log('Error al obtener categorías:', e);
      }
    });
  }
}
