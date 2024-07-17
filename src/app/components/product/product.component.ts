import { Component, OnInit, effect, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ImageModule } from 'primeng/image';
import { CardModule } from 'primeng/card';
import { FieldsetModule } from 'primeng/fieldset';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { Product } from '../../product/product.module';
import { loadProducts } from '../../state/product/products.action';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/red.store';
import { productSelector } from '../../state/product/products.reducer';
import { Observable } from 'rxjs';
import { storeAddProducts } from '../../state/cart/cart.action';
import { storeSelector } from '../../state/cart/cart.reducer';
import { LocalStorageService } from '../../service/local-storage.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [FormsModule ,ButtonModule,ImageModule ,CardModule ,FieldsetModule ,RatingModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
  collapse = signal<boolean>(true);
  product ?: any;
  singleProduct$ : Observable<Product[]>;
  productCart$ ?: Observable<any>;
  localSetCart:any ;
  constructor(private route:ActivatedRoute ,private store: Store<AppState> ,private localstorage :LocalStorageService){
    this.singleProduct$ = this.store.select(productSelector);
    this.productCart$ = this.store.select(storeSelector);
    effect(() => {
      if(localstorage.getItem("details")) {
        this.collapse.set(JSON.parse(localstorage.getItem("details")));
      }
    },{ allowSignalWrites: true })
  }
  ngOnInit(): void {
    let productId = this.route.snapshot.params['id'];

    this.store.dispatch(loadProducts({ id:productId }));
    this.singleProduct$.subscribe(state => {
      this.product = state;
    })
  }
  showDetails(event:any) {
    this.collapse.set(event.collapsed);
    this.localstorage.setItem("details" ,JSON.stringify(this.collapse()));
  }

  addCart(item : any) {
      this.store.dispatch(storeAddProducts({Items : item}))
      this.productCart$?.forEach(element =>
        this.localSetCart = element
      )
      this.localstorage.setItem('cart', JSON.stringify(this.localSetCart));
  }
}
