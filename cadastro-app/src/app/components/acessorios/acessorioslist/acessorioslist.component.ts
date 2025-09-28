import {
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { AcessorioService } from '../../../services/acessorio.service';
import { Acessorio } from '../../../models/acessorio';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-acessorioslist',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './acessorioslist.component.html',
  styleUrl: './acessorioslist.component.scss',
})
export class AcessorioslistComponent {

  acessorioEdit: Acessorio = new Acessorio(0, '');

  @Input('esconderBotoes') esconderBotoes: boolean = false;
  @Output('retorno') retorno = new EventEmitter<any>();

  @ViewChild('modalAcessorioDetalhe') modalAcessorioDetalhe: any;
  modalRef: MdbModalRef<any> | null = null;

  // Elementos da modal
  modalService = inject(MdbModalService); // Para conseguir abrir a modal
  @ViewChild('modalMarcas') modalMarcas!: TemplateRef<any>;
  @ViewChild('modalAcessorios') modalAcessorios!: TemplateRef<any>;
  //modalRef!: MdbModalRef<any>;

  acessorioService = inject(AcessorioService);
  lista: any;

  constructor() {
    this.findAll();
  }

  findAll() {
    this.acessorioService.findAll().subscribe({
      next: (listaRetornada) => {
        this.lista = listaRetornada;
      },
      error: (erro) => {
        Swal.fire(erro.error, '', 'error');
      },
    });
  }

  deleteById(acessorio: Acessorio) {
    Swal.fire({
      title: 'Deseja mesmo deletar?',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.acessorioService.deleteById(acessorio.id).subscribe({
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

  new() {
    this.acessorioEdit = new Acessorio(0, '');
    this.modalRef = this.modalService.open(this.modalAcessorioDetalhe);
  }

  edit(acessorio: Acessorio) {
    this.acessorioEdit = Object.assign({}, acessorio);
    this.modalRef = this.modalService.open(this.modalAcessorioDetalhe);
  }

  retornoDetalhe(acessorio: Acessorio) {
    this.findAll();
    this.salvar();
    this.modalRef?.close();
  }

  select(acessorio: Acessorio) {
    this.retorno.emit(acessorio);
  }

  salvar() {
  this.acessorioService.save(this.acessorioEdit).subscribe({
    next: (mensagem) => {
      Swal.fire(mensagem, '', 'success');
      this.findAll();
      this.modalRef?.close();
    },
    error: (erro) => {
      Swal.fire(erro.error, '', 'error');
    },
  });
}
}
