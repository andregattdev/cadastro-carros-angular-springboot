import { Component } from '@angular/core';

import { MenuComponent } from "../menu/menu.component";
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [RouterOutlet, MenuComponent, SidebarComponent, FooterComponent],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.scss'
})
export class PrincipalComponent {

}
