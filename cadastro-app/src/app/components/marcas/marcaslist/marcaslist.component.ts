import {
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { MarcaService } from '../../../services/marca.service';
import { Marca } from '../../../models/marca';
import { MdbModalService, MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-marcaslist',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './marcaslist.component.html',
  styleUrls: ['./marcaslist.component.scss'],
})
export class MarcaslistComponent {
  lista: Marca[] = [];
  pesquisa: string = '';
  marcaEdit: Marca = new Marca(0, '');

  @Input('esconderBotoes') esconderBotoes: boolean = false;
  @Output('retorno') retorno = new EventEmitter<any>();

  marcaService = inject(MarcaService);
  modalService = inject(MdbModalService);

  @ViewChild('modalMarcaDetalhe') modalMarcaDetalhe: any;
  modalRef: MdbModalRef<any> | null = null;

  constructor() {
    this.findAll();
  }

  findAll() {
    this.marcaService.findAll().subscribe({
      next: (listaRetornada) => {
        this.lista = listaRetornada;
      },
      error: (erro) => {
        Swal.fire(erro.error, '', 'error');
      },
    });
  }

  deleteById(marca: Marca) {
    Swal.fire({
      title: 'Deseja mesmo deletar?',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.marcaService.deleteById(marca.id).subscribe({
          next: (mensagem) => {
            Swal.fire(mensagem, '', 'success');
            this.findAll();
          },
          error: (erro) => {
            Swal.fire(erro.error, '', 'error');
          },
        });
      }
    });
  }

  findByNome() {
    this.marcaService.findByNome(this.pesquisa).subscribe({
      next: (lista) => {
        this.lista = lista;
      },
      error: (erro) => {
        Swal.fire(erro.error, '', 'error');
      },
    });
  }

  new() {
    this.marcaEdit = new Marca(0, '');
    this.modalRef = this.modalService.open(this.modalMarcaDetalhe);
  }

  edit(marca: Marca) {
    this.marcaEdit = Object.assign({}, marca);
    this.modalRef = this.modalService.open(this.modalMarcaDetalhe);
  }

  retornoDetalhe(marca: Marca) {
    this.marcaService.save(marca).subscribe({
      next: (mensagem) => {
        Swal.fire('Marca salva com sucesso!', '', 'success');
        this.findAll();
        this.modalRef?.close();
      },
      error: (erro) => {
        Swal.fire(erro.error, '', 'error');
      },
    });
  }

  select(marca: Marca) {
    this.retorno.emit(marca);
  }
}
