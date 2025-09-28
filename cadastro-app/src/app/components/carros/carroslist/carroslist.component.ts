import { CarroService } from './../../../services/carro.service';
import {
  Component,
  inject,
  TemplateRef,
  ViewChild,
  viewChild,
} from '@angular/core';
import {
  MdbModalModule,
  MdbModalRef,
  MdbModalService,
} from 'mdb-angular-ui-kit/modal';
import { Carro } from '../../../models/carro';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { CarrosdetailsComponent } from '../carrosdetails/carrosdetails.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carroslist',
  standalone: true,
  imports: [RouterLink, MdbModalModule, CarrosdetailsComponent, CommonModule],
  templateUrl: './carroslist.component.html',
  styleUrl: './carroslist.component.scss',
})
export class CarroslistComponent {
  lista: Carro[] = [];
  carroEdit: Carro = new Carro(0, '');

  // Elementos da modal
  modalService = inject(MdbModalService); // Para conseguir abrir a modal
  @ViewChild('modalCarroDetalhe') modalCarroDetalhe!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;

  carroService = inject(CarroService);

  constructor() {

    this.listAll();

    let carroNovo = history.state.carroNovo;
    let carroEditado = history.state.carroEditado;

    if (carroNovo) {
      carroNovo.id = 555;
      this.lista.push(carroNovo);
    }

    if (carroEditado != null) {
      let indice = this.lista.findIndex((x) => {
        return x.id == carroEditado.id;
      });
      this.lista[indice] = carroEditado;
    }
  }

  listAll() {
    this.carroService.listAll().subscribe({
      next: (lista) => {
        //quando o método retornar o que é esperado
        this.lista = lista;
      },
      error: (erro) => {
        //quando ocorrer qualquer erro
        Swal.fire({
            title: 'Ocorreu um erro!',
            icon: 'error',
            confirmButtonText: 'OK',
          });
      },
    });
  }

deleteById(carro: Carro) {
  Swal.fire({
    title: 'Tem certeza que deseja deletar este registro?',
    icon: 'warning',
    showConfirmButton: true,
    showDenyButton: true,
    confirmButtonText: 'Sim, deletar',
    cancelButtonText: 'Cancelar',
  }).then((result) => {
    if (result.isConfirmed) {
      this.carroService.delete(carro.id).subscribe({
        next: (mensagem) => {
          Swal.fire({
            title: mensagem,
            icon: 'success',
            confirmButtonText: 'OK',
          });
          this.listAll();
        },
        error: (erro) => {
         Swal.fire({
            title: 'Ocorreu um erro!',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        },
      });
    }
  });
}


  new() {
    this.carroEdit = new Carro(0, '');
    this.modalRef = this.modalService.open(this.modalCarroDetalhe);
  }

  edit(carro: Carro) {
    this.carroEdit = Object.assign({}, carro); // Clonando para evitar referencia de objeto
    this.modalRef = this.modalService.open(this.modalCarroDetalhe);
  }

  retornoDetalhe(carro: Carro) {
   this.listAll();
    this.modalRef.close();
  }
}
