import { AcessoriosformComponent } from './components/acessorios/acessoriosform/acessoriosform.component';
import { MarcaslistComponent } from './components/marcas/marcaslist/marcaslist.component';
import { Routes } from '@angular/router';
import { LoginComponent } from './components/layout/login/login.component';
import { PrincipalComponent } from './components/layout/principal/principal.component';
import { CarroslistComponent } from './components/carros/carroslist/carroslist.component';
import { CarrosdetailsComponent } from './components/carros/carrosdetails/carrosdetails.component';
import { MarcasdetailsComponent } from './components/marcas/marcasdetails/marcasdetails.component';
import { AcessorioslistComponent } from './components/acessorios/acessorioslist/acessorioslist.component';

import { UsuarioformComponent } from './components/usuario/usuarioform/usuarioform.component';
import { UsuariolistComponent } from './components/usuario/usuariolist/usuariolist.component';
import { AdminGuard } from './guards/admin.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'admin',
    component: PrincipalComponent,
    children: [
  { path: 'carros', component: CarroslistComponent },
  { path: 'carros/new', component: CarrosdetailsComponent },
  { path: 'carros/edit/:id', component: CarrosdetailsComponent },
  { path: 'acessorios', component: AcessorioslistComponent },
  { path: 'acessorios/new', component: AcessoriosformComponent },
  { path: 'acessorios/edit/:id', component: AcessoriosformComponent },
  { path: 'marcas', component: MarcaslistComponent },
  { path: 'marcas/new', component: MarcasdetailsComponent },
  { path: 'marcas/edit/:id', component: MarcasdetailsComponent },
  { path: 'usuarios', component: UsuariolistComponent, canActivate: [AdminGuard] },
  { path: 'usuarios/new', component: UsuarioformComponent, canActivate: [AdminGuard] },
  { path: 'usuarios/edit/:id', component: UsuarioformComponent, canActivate: [AdminGuard] },
],
  },
];
