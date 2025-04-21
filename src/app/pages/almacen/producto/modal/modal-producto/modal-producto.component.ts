import { Component, EventEmitter, Input, Output, ViewChild, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SourceService } from '../../../../services/source.service';

@Component({
  selector: 'app-modal-producto',
  templateUrl: './modal-producto.component.html',
  styleUrls: ['./modal-producto.component.css']
})
export class ModalProductoComponent implements OnInit, OnChanges {
  @Input() producto: any = {};
  @Input() modo: 'crear' | 'editar' | 'ver' = 'crear';
  @Output() onGuardar = new EventEmitter<any>();
  @ViewChild('productoForm') productoForm!: NgForm;

  unidades: any[] = [];
  familias: any[] = [];

  constructor(private sourceService: SourceService) {}

  ngOnInit(): void {
    // Carga select-options
    this.sourceService.getUnidadesMedidaDesdeProducto().subscribe({
      next: (res) => this.unidades = res.query,
      error: () => this.unidades = []
    });
    this.sourceService.getFamiliaProducto().subscribe({
      next: (res) => this.familias = res.query,
      error: () => this.familias = []
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    // Cuando cambian los @Input() 'producto' o 'modo', resetea el form
    if (changes['producto'] || changes['modo']) {
      // espera al próximo ciclo para tener el ViewChild
      setTimeout(() => {
        if (this.productoForm) {
          // resetForm() con el modelo actual deja campos limpios y con valores
          this.productoForm.resetForm(this.producto);
        }
      });
    }
  }
  

  guardar() {
    this.onGuardar.emit(this.producto);
  }

  resetearFormulario() {
    if (this.productoForm) {
      this.productoForm.resetForm(this.modo === 'crear' ? {} : this.producto);
    }
  }
}
