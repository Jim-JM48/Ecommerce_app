import { Component, OnInit } from '@angular/core';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { Cart, ResponsiveOptions } from '../../product/product.module';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/red.store';
import { Observable } from 'rxjs';
import { storeSelector } from '../../state/cart/cart.reducer';
import { loadStored, storeDeleteProducts } from '../../state/cart/cart.action';
import { LocalStorageService } from '../../service/local-storage.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CarouselModule, ButtonModule, TagModule ,ConfirmDialogModule, ToastModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  myCart ?: any;
  total : number = 0;
  getCartStore$ : Observable<Cart[]>;
  responsiveOptions ?: ResponsiveOptions[];

  constructor(private store : Store<AppState> ,private localstorage :LocalStorageService) {
    this.getCartStore$ = this.store.select(storeSelector)
  }


  ngOnInit(): void {
    this.store.dispatch(loadStored());
    this.getCartStore$.subscribe(state =>
      this.myCart = state
    )

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
    this.localstorage.setItem("cart", JSON.stringify(this.myCart));
  }
  removeCart(element : Cart[]) {
      this.total = 0;
      this.store.dispatch(storeDeleteProducts({Data : element}));
      this.updateLocalStorage()
  }
}
