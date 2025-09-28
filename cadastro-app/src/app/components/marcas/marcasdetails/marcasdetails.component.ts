import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MdbModalModule, MdbModalService } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-marcasdetails',
  standalone: true,
  imports: [MdbModalModule, CommonModule
],
providers: [MdbModalService],
  templateUrl: './marcasdetails.component.html',
  styleUrl: './marcasdetails.component.scss'
})
export class MarcasdetailsComponent {

}
