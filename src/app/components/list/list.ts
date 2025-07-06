import { Component, OnInit} from '@angular/core';
import { IProducto } from '../../interfaces/producto';
import { ICategoria } from '../../interfaces/categoria';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Producto, Categoria } from '../../services/producto';

@Component({
  selector: 'app-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './list.html',
  styleUrl: './list.css'
})
export class List implements OnInit {
  productos: IProducto[] = [];
  categorias: ICategoria[] = [];
  productosFiltrados: IProducto[] = [];
  searchTerm: string = '';
  categoriaSeleccionada: number = 0;
  
  currentPage: number = 1;
  itemsPerPage: number = 6;
  totalPages: number = 1;

  constructor(
    private _productoService: Producto,
    private _categoriaService: Categoria
  ) {}

  ngOnInit() {
    this.obtenerProductos();
    this.obtenerCategorias();
  }

  obtenerProductos() {
    this._productoService.getList().subscribe({
      next: (data) => {
        this.productos = data;
        this.aplicarFiltros();
      },
      error: (e) => console.log('Error al obtener productos:', e)
    });
  }

  obtenerCategorias() {
    this._categoriaService.getListC().subscribe({
      next: (data) => {
        this.categorias = data;
      },
      error: (e) => console.log('Error al obtener categorías:', e)
    });
  }

  buscar() {
    this.currentPage = 1;
    this.aplicarFiltros();
  }

  filtrarPorCategoria(categoriaId: number) {
    this.categoriaSeleccionada = categoriaId;
    this.currentPage = 1;
    this.aplicarFiltros();
  }

  aplicarFiltros() {
    let productos = [...this.productos];
    
    if (this.searchTerm.trim()) {
      productos = productos.filter(p => 
        p.nombre.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        p.categoriaNombre?.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
    
    if (this.categoriaSeleccionada > 0) {
      const categoriaSeleccionadaNombre = this.categorias.find(c => c.id === this.categoriaSeleccionada)?.nombre;
      if (categoriaSeleccionadaNombre) {
        productos = productos.filter(p => p.categoriaNombre === categoriaSeleccionadaNombre);
      }
    }
    
    this.productosFiltrados = productos;
    this.calcularPaginacion();
  }

  calcularPaginacion() {
    this.totalPages = Math.ceil(this.productosFiltrados.length / this.itemsPerPage);
  }

  get productosPaginados(): IProducto[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.productosFiltrados.slice(start, end);
  }

  cambiarPagina(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  get paginasArray(): number[] {
    return Array.from({length: this.totalPages}, (_, i) => i + 1);
  }

  get paginasVisibles(): number[] {
    const start = Math.max(0, this.currentPage - 3);
    const end = Math.min(this.totalPages, this.currentPage + 2);
    return this.paginasArray.slice(start, end);
  }
}
