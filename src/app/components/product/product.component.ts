import { Component, OnInit, effect, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ImageModule } from 'primeng/image';
import { CardModule } from 'primeng/card';
import { FieldsetModule } from 'primeng/fieldset';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { loadProducts } from '../../state/product/products.action';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../state/red.store';
import { loadingSelector, productSelector } from '../../state/product/products.reducer';
import { Observable } from 'rxjs';
import { storeAddProducts } from '../../state/cart/cart.action';
import { LocalStorageService } from '../../service/local-storage.service';
import { AsyncPipe } from '@angular/common';
import { storeLengthSelector, storeSelector } from '../../state/cart/cart.reducer';
import { Cart } from '../../product/product.module';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [FormsModule ,AsyncPipe ,ButtonModule ,ImageModule ,CardModule ,FieldsetModule ,RatingModule ,ToastModule ,RippleModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
  singleProduct$ : Observable<any>;
  productCart$ : Observable<any>;
  isLoading$ : Observable<string>;
  cartLength$ : Observable<number>;

  collapse = signal<boolean>(true);
  dataLoaded = signal<boolean>(true);
  localSetCart :any ;
  lengthCart : number = 0;

  constructor(private route:ActivatedRoute ,private store: Store<AppState> ,private localstorage :LocalStorageService ,private messageService: MessageService){
    this.singleProduct$ = this.store.pipe(select(productSelector));
    this.productCart$ = this.store.pipe(select(storeSelector));
    this.isLoading$ = this.store.pipe(select(loadingSelector));
    this.cartLength$ = this.store.pipe(select(storeLengthSelector));

    effect(() => {
      if(localstorage.getItem("details")) {
        this.collapse.set(JSON.parse(localstorage.getItem("details")));
      }
    },{ allowSignalWrites: true })
  }
  ngOnInit(): void {
    let productId = this.route.snapshot.params['id'];

    this.store.dispatch(loadProducts({ id:productId }));
    this.isLoading$.subscribe((loading) => {
      if(loading === 'success') {
        this.dataLoaded.set(false);
      }
    })
    this.cartLength$.subscribe(state =>
      this.lengthCart = state + 1
    )
  }

  showWarn() {
    this.messageService.clear();
    let msg = "You Exceeded The Amount Of Items Added To Cart Max Number Is : 10"
    this.messageService.add({key: "maxLengthError", severity: 'info', summary: 'Warning', detail:  msg});
  }
  showDetails(event:any) {
    this.collapse.set(event.collapsed);
    this.localstorage.setItem("details" ,JSON.stringify(this.collapse()));
  }

  addCart(item : Cart) {
      if(this.lengthCart > 10) {
        this.showWarn()
      }else {
        this.store.dispatch(storeAddProducts({Items : item}))
      this.productCart$?.forEach(element =>
        this.localSetCart = element
      )
      this.localstorage.setItem('cart', JSON.stringify(this.localSetCart));
      }
  }
}
