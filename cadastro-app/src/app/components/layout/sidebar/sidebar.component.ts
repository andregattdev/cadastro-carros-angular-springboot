import { Component } from '@angular/core';
import { Usuario } from '../../../auth/usuario';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    FooterComponent,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {

  usuarioLogado!: Usuario;

constructor() {
  const usuarioSalvo = localStorage.getItem('usuario');
  if (usuarioSalvo) {
    this.usuarioLogado = JSON.parse(usuarioSalvo);
  }
}
}

