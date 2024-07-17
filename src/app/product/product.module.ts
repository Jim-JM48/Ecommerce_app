import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Product {
  id : number;
  title : string;
  price : number;
  description : string;
  category : string;
  image : string;
  rating : {
    rate : number;
    count : number;
  }
}

export interface Cart {
  Items : Product
  uniqueId : number
}

export interface ResponsiveOptions {
  breakpoint: string,
  numVisible: number,
  numScroll: number
}


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class ProductModule {

}
