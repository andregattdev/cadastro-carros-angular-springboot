import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service'; // seu serviço de login
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

canActivate(): boolean {
  if (this.authService.isAdmin()) {
    return true;
  }

  Swal.fire('Acesso negado', 'Você não tem permissão para acessar esta página.', 'error');
  this.router.navigate(['/home']);
  return false;
}
}
