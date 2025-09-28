import { Component, EventEmitter, inject, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbModalService, MdbModalRef } from 'mdb-angular-ui-kit/modal';
import Swal from 'sweetalert2';

import { CarroService } from '../../../services/carro.service';
import { AcessorioService } from '../../../services/acessorio.service';
import { Carro } from '../../../models/carro';
import { Marca } from '../../../models/marca';
import { Acessorio } from '../../../models/acessorio';
import { MarcaslistComponent } from '../../marcas/marcaslist/marcaslist.component';
import { AcessorioslistComponent } from '../../acessorios/acessorioslist/acessorioslist.component';

@Component({
  selector: 'app-carrosdetails',
  standalone: true,
  imports: [
    CommonModule,
    MdbFormsModule,
    FormsModule,
    MarcaslistComponent,
    AcessorioslistComponent,
  ],
  templateUrl: './carrosdetails.component.html',
  styleUrl: './carrosdetails.component.scss',
})
export class CarrosdetailsComponent {
  @Input('carro') carro: Carro = new Carro(0, '');
  @Output('retorno') retorno = new EventEmitter<any>();

  acessorioEdit: Acessorio = new Acessorio(0, '', '');

  router = inject(ActivatedRoute);
  router2 = inject(Router);
  modalService = inject(MdbModalService);
  carroService = inject(CarroService);
  acessorioService = inject(AcessorioService);

  @ViewChild('modalMarcas') modalMarcas!: TemplateRef<any>;
  @ViewChild('modalAcessorios') modalAcessorios!: TemplateRef<any>;
  @ViewChild('modalAcessorioDetalhe') modalAcessorioDetalhe!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;

  constructor() {
    const id = this.router.snapshot.params['id'];
    if (id > 0) {
      this.findById(id);
    }
  }

  findById(id: number) {
    this.carroService.findById(id).subscribe({
      next: (retorno) => {
        this.carro = retorno;
      },
      error: () => {
        Swal.fire({
          title: 'Ocorreu um erro!',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      },
    });
  }

  save() {
    const acao = this.carro.id > 0 ? this.carroService.update(this.carro, this.carro.id) : this.carroService.save(this.carro);

    acao.subscribe({
      next: (mensagem) => {
        Swal.fire({
          title: mensagem,
          icon: 'success',
          confirmButtonText: 'OK',
        });

        this.router2.navigate(['admin/carros'], {
          state: this.carro.id > 0 ? { carroEditado: this.carro } : { carroNovo: this.carro },
        });

        this.retorno.emit(this.carro);
      },
      error: (erro) => {
        Swal.fire({
          title: 'Erro ao salvar!',
          text: erro?.error?.message || 'Erro desconhecido.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      },
    });
  }

  buscarMarca() {
    this.modalRef = this.modalService.open(this.modalMarcas, {
      modalClass: 'modal-lg',
    });
  }

  buscarAcessorio() {
    this.modalRef = this.modalService.open(this.modalAcessorios, {
      modalClass: 'modal-lg',
    });
  }

  abrirModalNovoAcessorio() {
    this.acessorioEdit = new Acessorio(0, '', '');
    this.modalRef = this.modalService.open(this.modalAcessorioDetalhe);
  }

  salvarAcessorio() {
    this.acessorioService.save(this.acessorioEdit).subscribe({
      next: (mensagem) => {
        Swal.fire(mensagem, '', 'success');
        if (!this.carro.acessorios) this.carro.acessorios = [];
        this.carro.acessorios.push(this.acessorioEdit);
        this.modalRef?.close();
      },
      error: (erro) => {
        Swal.fire(erro.error, '', 'error');
      },
    });
  }

  retornoMarca(marca: Marca) {
    this.carro.marca = marca;
    this.modalRef.close();
  }

  retornoAcessorio(acessorio: Acessorio) {
    console.log('Acessório selecionado:', acessorio);
    if (!this.carro.acessorios) this.carro.acessorios = [];
    this.carro.acessorios.push(acessorio);
    this.modalRef.close();
  }

  desvincularAcessorioCarro(acessorio: Acessorio) {
    /* para remover e nao deletar o acessório do carro tem esses 2 métodos */
    /*
    if (!this.carro.acessorios) return;
    this.carro.acessorios = this.carro.acessorios.filter(a => a.id !== acessorio.id);
    */

    let posicao = this.carro.acessorios.findIndex(x => {return x.id == acessorio.id});
    this.carro.acessorios.splice(posicao, 1);
  }
}
