import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ICategoria } from '../../interfaces/categoria';
import { IProducto } from '../../interfaces/producto';
import { Producto, Categoria } from '../../services/producto';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
    categorias: ICategoria[] = [];
    productosDestacados: IProducto[] = [];

    constructor(
        private _productoService: Producto, 
        private _categoriaService: Categoria
    ) {}

    ngOnInit() {
        this.obtenerCategorias();
        this.obtenerProductosDestacados();
    }

    obtenerCategorias() {
        this._categoriaService.getListC().subscribe({
            next: (data) => {
                console.log('Categorías en Home:', data);
                this.categorias = data;
            },
            error: (e) => console.log('Error al obtener categorías:', e)
        });
    }

    obtenerProductosDestacados() {
        this._productoService.getList().subscribe({
            next: (data) => {
                console.log('Productos en Home:', data);
                this.productosDestacados = data.slice(0, 3);
            },
            error: (e) => console.log('Error al obtener productos:', e)
        });
    }
}
