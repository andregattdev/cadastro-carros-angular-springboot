import { Injectable } from '@angular/core';
import { Usuario } from '../auth/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usuarioLogado: Usuario | null = null;

  constructor() {
    const usuarioSalvo = localStorage.getItem('usuario');
    if (usuarioSalvo) {
      this.usuarioLogado = JSON.parse(usuarioSalvo);
    }
  }

  login(usuario: Usuario) {
    this.usuarioLogado = usuario;
    localStorage.setItem('usuario', JSON.stringify(usuario));
  }

  logout() {
    this.usuarioLogado = null;
    localStorage.removeItem('usuario');
  }

  getUsuarioLogado(): Usuario | null {
    const usuarioSalvo = localStorage.getItem('usuario');

    return this.usuarioLogado;
  }

  isAdmin(): boolean {
    return this.usuarioLogado?.role === 'ADMIN';
  }
}
