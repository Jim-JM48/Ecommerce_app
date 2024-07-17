import { Component } from '@angular/core';
import { CarosulComponent } from '../../layout/carosul/carosul.component';
import { SectionComponent } from '../../layout/section/section.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarosulComponent ,SectionComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
