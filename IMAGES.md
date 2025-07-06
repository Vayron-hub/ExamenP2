# StockG - Imágenes de Productos

## Estructura de Imágenes

Para agregar imágenes de productos y categorías en StockG:

### 1. Ubicación de Imágenes
- Todas las imágenes se almacenan en la carpeta `public/images/`
- El logo principal está en `public/logo.png`

### 2. Estructura Recomendada
```
public/
  ├── logo.png (Logo principal - YA EXISTE)
  └── images/
      ├── productos/
      │   ├── mancuernas.jpg
      │   ├── cinta-correr.jpg
      │   └── bicicleta-estatica.jpg
      └── categorias/
          ├── pesas.jpg
          ├── cardio.jpg
          └── funcional.jpg
```

### 3. Como Agregar Imágenes
1. Crear la carpeta `public/images/` si no existe
2. Agregar archivos de imagen (.jpg, .png, .webp)
3. El nombre del archivo debe coincidir con la propiedad `imagen` en la base de datos

### 4. Ejemplo de Uso
Si tienes un producto con:
```json
{
  "id": 1,
  "nombre": "Mancuernas Adjustables",
  "imagen": "productos/mancuernas.jpg",
  "precio": 1200.00,
  "categoriaNombre": "Pesas"
}
```

La imagen se cargará automáticamente desde `/images/productos/mancuernas.jpg`

### 5. Formatos Recomendados
- **Formato**: JPG, PNG o WebP
- **Tamaño**: 800x600 píxeles (4:3)
- **Peso**: Máximo 500KB por imagen
- **Calidad**: Alta resolución para productos premium

### 6. Fallback
Si no hay imagen disponible, se mostrará:
- En productos: Icono con la primera letra del nombre
- En categorías: Emoji temático (🏋️, 💪, 🎯)

## Implementación Técnica

### Home Component
```html
<img *ngIf="producto.imagen" 
     [src]="'/images/' + producto.imagen" 
     [alt]="producto.nombre"
     class="w-full h-full object-cover rounded-2xl">
```

### List Component  
```html
<img *ngIf="producto.imagen" 
     [src]="'/images/' + producto.imagen" 
     [alt]="producto.nombre"
     class="w-full h-full object-cover rounded-xl">
```

## Branding Actualizado
- **Colores principales**: Gris oscuro (#374151) con acentos amarillo/beige (#FCD34D)
- **Logo**: Imagen real desde `public/logo.png`
- **Tipografía**: Bold, uppercase, tracking wide
- **Tema**: Fitness profesional, moderno y elegante
