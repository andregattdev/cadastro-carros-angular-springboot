import { Component, inject, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

import { UsuarioService } from '../../../services/usuario.service';
import { MdbModalService, MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { CommonModule } from '@angular/common';
import { Usuario } from '../../../auth/usuario';

@Component({
  selector: 'app-usuarioform',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './usuarioform.component.html',
  styleUrls: ['./usuarioform.component.scss'],
})
export class UsuarioformComponent {
  lista: Usuario[] = [];

  // ✅ Inicialização correta com id: null
  usuarioEdit: Usuario = {
    id: null,
    username: '',
    password: '',
    role: 'USER'
  };

  usuarioService = inject(UsuarioService);
  modalService = inject(MdbModalService);

  @ViewChild('modalUsuarioDetalhe') modalUsuarioDetalhe: any;
  modalRef: MdbModalRef<any> | null = null;

  constructor() {
    this.findAll();
  }

  findAll() {
    this.usuarioService.listarUsuarios().subscribe({
      next: (listaRetornada) => {
        this.lista = listaRetornada;
      },
      error: (erro) => {
        Swal.fire(erro?.error || 'Erro ao carregar usuários', '', 'error');
      },
    });
  }

  new() {
    // ✅ Evita erro de tipo: não usar new Usuario(0, ...)
    this.usuarioEdit = {
      id: null,
      username: '',
      password: '',
      role: 'USER'
    };
    this.modalRef = this.modalService.open(this.modalUsuarioDetalhe);
  }

retornoDetalhe(usuario: Usuario) {
  if (usuario.id == null) {
    this.usuarioService.cadastrarUsuario(usuario).subscribe({
      next: (usuarioCriado) => {
        Swal.fire('Usuário cadastrado com sucesso!', '', 'success');
        this.lista.push(usuarioCriado);
        this.modalRef?.close();
      },
      error: (erro) => {
        Swal.fire(erro?.error || 'Erro ao cadastrar usuário', '', 'error');
      },
    });
  } else {
    this.atualizarUsuario(usuario);
  }
}

atualizarUsuario(usuario: Usuario) {
  if (!usuario.id) return;

  this.usuarioService.atualizarUsuario(usuario.id, usuario).subscribe({
    next: (usuarioAtualizado) => {
      Swal.fire('Usuário atualizado com sucesso!', '', 'success');

      // ✅ Atualiza na lista local
      const index = this.lista.findIndex(u => u.id === usuarioAtualizado.id);
      if (index !== -1) {
        this.lista[index] = usuarioAtualizado;
      }

      this.modalRef?.close();
    },
    error: (erro) => {
      Swal.fire(erro?.error || 'Erro ao atualizar usuário', '', 'error');
    },
  });
}

editarUsuario(usuario: Usuario) {
  this.usuarioEdit = { ...usuario }; // clona para evitar edição direta
  this.modalRef = this.modalService.open(this.modalUsuarioDetalhe);
}

deletarUsuario(id: number) {
  Swal.fire({
    title: 'Tem certeza?',
    text: 'Essa ação não pode ser desfeita.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sim, deletar',
    cancelButtonText: 'Cancelar'
  }).then(result => {
    if (result.isConfirmed) {
      this.usuarioService.excluirUsuario(id).subscribe({
        next: () => {
          Swal.fire('Usuário excluído com sucesso!', '', 'success');
          this.lista = this.lista.filter(u => u.id !== id);
        },
        error: (erro) => {
          Swal.fire(erro?.error || 'Erro ao excluir usuário', '', 'error');
        },
      });
    }
  });
}



}
