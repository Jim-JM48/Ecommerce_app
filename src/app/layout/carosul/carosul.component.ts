import { Component } from '@angular/core';
import { CarouselModule, CarouselResponsiveOptions } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-carosul',
  standalone: true,
  imports: [CarouselModule ,ButtonModule ,TagModule],
  templateUrl: './carosul.component.html',
  styleUrl: './carosul.component.css'
})
export class CarosulComponent {

  imgList = ["../../../assets/images/cottonbro.jpg" ,"../../../assets/images/karolina-grabowsk.jpg","../../../assets/images/voitkevich.jpg"]

  responsiveOptions: CarouselResponsiveOptions[]|undefined;
}
