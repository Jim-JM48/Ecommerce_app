import { Component } from '@angular/core';
import { CarouselComponent } from '../../shared/carousel/carousel.component';
import { SectionComponent } from '../../shared/section/section.component';
import { ContactComponent } from '../contact/contact.component';

@Component({
    selector: 'app-home',
    imports: [CarouselComponent, SectionComponent, ContactComponent],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent {

}
