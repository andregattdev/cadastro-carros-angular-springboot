import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../auth/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private baseUrl = 'http://localhost:8080/api/cadastro';

  constructor(private http: HttpClient) {}

  // ✅ Cadastro de usuário (POST /api/cadastro)
  cadastrarUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.baseUrl}`, usuario);
  }

  // ✅ Listagem de usuários (GET /api/cadastro/listar)
  listarUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.baseUrl}/listar`);
  }

  // 🔍 Buscar usuário por ID (GET /api/cadastro/usuarios/{id})
  buscarPorId(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.baseUrl}/usuarios/${id}`);
  }

  // ✏️ Atualizar usuário (PUT /api/cadastro/usuarios/{id})
  atualizarUsuario(id: number, usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.baseUrl}/usuarios/${id}`, usuario);
  }

  // ❌ Excluir usuário (DELETE /api/cadastro/usuarios/{id})
  excluirUsuario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/usuarios/${id}`);
  }
}
