import { Component } from '@angular/core';
import { CarouselModule, CarouselResponsiveOptions } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';

@Component({
    selector: 'app-carosul',
    imports: [CarouselModule, ButtonModule, TagModule],
    templateUrl: './carousel.component.html',
    styleUrl: './carousel.component.css'
})
export class CarouselComponent {

  imgList = ["../../../assets/images/cottonbro.jpg" ,"../../../assets/images/karolina-grabowsk.jpg","../../../assets/images/voitkevich.jpg"]

  responsiveOptions: CarouselResponsiveOptions[]|undefined;
}
