import { Component } from '@angular/core';
import { SourceService } from '../../services/source.service';
import Swal from 'sweetalert2';
declare const bootstrap: any;

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent {
  pageTitle: string = 'Productos';
  loading: boolean = false;

  currentPage = 1;
  lastPage = 1;
  productos: any[] = [];

  query: any[] = [];

  //para los modales
  productoSeleccionado: any = {};
  modoFormulario: 'crear' | 'editar' | 'ver' = 'crear';

  constructor(private SourceService: SourceService){}
  
  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(page: number = 1) {
    this.loading = true;
    this.SourceService.getProductosPaginados(page).subscribe({
      next: (res) => {
        const query = res.query; // ← Aquí accedes a la propiedad correcta
        this.productos = query.data;
        this.currentPage = query.current_page;
        this.lastPage = query.last_page;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }
  

  Buscar(): void {
    this.loading = true;
    this.SourceService.getAlmacenProductoTable()
    .subscribe(data => {
      console.log("Datos recibidos:", data.query);
      this.query = data.query;
      this.loading = false;
    }, error => {
      console.error(error);
      this.loading = false;
    });
  }

  abrirModal(){
    this.productoSeleccionado = {};    // dispara ngOnChanges
    this.modoFormulario = 'crear';     // dispara ngOnChanges
    const modal = new bootstrap.Modal(
      document.getElementById('modalProducto')!
  );
  modal.show();

  }

  guardarProducto(data: any) {
    const finish = () => {
      // 1) Cierra el modal
      const modalEl = document.getElementById('modalProducto')!;
      const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
      modal.hide();
  
      // 2) Limpia la clase que deja el backdrop en el <body>
      document.body.classList.remove('modal-open');
  
      // 3) Elimina cualquier backdrop acumulado
      document.querySelectorAll('.modal-backdrop').forEach(el => el.remove());
  
      // 4) Recarga la página actual de la tabla
      this.cargarProductos(this.currentPage);
    };
  
    if (this.modoFormulario === 'crear') {
      this.SourceService.registrarProducto(data).subscribe({
        next: () => {
          Swal.fire('Éxito', 'Producto registrado', 'success')
             .then(() => finish());
        },
        error: err => {
          console.error(err);
          Swal.fire('Error', err?.error?.message || 'No se pudo registrar el producto', 'error');
        }
      });
    } else {
      this.SourceService.actualizarProducto(data.producto_id, data).subscribe({
        next: () => {
          Swal.fire('Éxito', 'Producto actualizado', 'success')
             .then(() => finish());
        },
        error: err => {
          console.error(err);
          Swal.fire('Error', err?.error?.message || 'No se pudo actualizar el producto', 'error');
        }
      });
    }
  }
  
  

  editarProducto(producto: any): void {
    this.productoSeleccionado = {
      ...producto,
      precio: producto.precios?.[0]?.precio || 0
    };                                  // dispara ngOnChanges
    this.modoFormulario = 'editar';     // dispara ngOnChanges
    new bootstrap.Modal(
      document.getElementById('modalProducto')!
    ).show();
  }
  
  eliminarProducto(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.SourceService.eliminarProducto(id).subscribe({
          next: () => {
            Swal.fire('Eliminado', 'El producto ha sido eliminado', 'success');
            this.cargarProductos(this.currentPage);
          },
          error: () => {
            Swal.fire('Error', 'No se pudo eliminar el producto', 'error');
          }
        });
      }
    });
  }
  
}
