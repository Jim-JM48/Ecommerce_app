import { Component, OnInit } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { Cart, ResponsiveOptions } from '../../product/product.module';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../state/red.store';
import { Observable } from 'rxjs';
import { storeSelector } from '../../state/cart/cart.reducer';
import { loadStored, storeDeleteProducts } from '../../state/cart/cart.action';
import { LocalStorageService } from '../../service/local-storage.service';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-cart',
    imports: [AsyncPipe, CarouselModule, ButtonModule, TagModule],
    templateUrl: './cart.component.html',
    styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  total : number = 0;
  getCartStore$ : Observable<Cart[]>;
  localStorageItems ?: any;
  responsiveOptions ?: ResponsiveOptions[];

  constructor(private store : Store<AppState> ,private localstorage :LocalStorageService) {
    this.getCartStore$ = this.store.pipe(select(storeSelector))
  }


  ngOnInit(): void {
    this.store.dispatch(loadStored());

    this.getCartStore$.forEach(element => element.map((val) =>
      this.total += val.Items.price))

    this.responsiveOptions = [
      {
          breakpoint: '640px',
          numVisible: 1,
          numScroll: 1
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 1
    }
    ]
  }

  updateLocalStorage() {
    this.store.dispatch(loadStored())
    this.getCartStore$.subscribe(state => {
      this.localStorageItems =state;
    })
    this.localstorage.setItem("cart", JSON.stringify(this.localStorageItems));
  }
  removeCart(item:Cart ,items:Cart[]) {
      this.total = 0;
      this.store.dispatch(storeDeleteProducts({Data : item}));
      this.updateLocalStorage();
  }
}
