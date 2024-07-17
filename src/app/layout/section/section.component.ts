import { Component ,OnInit } from '@angular/core';
import { FilterComponent } from '../../components/filter/filter.component';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { Product } from '../../product/product.module';
import { Observable, } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/red.store';
import { loadProducts } from '../../state/product/products.action';
import { productSelector, loadingSelector } from '../../state/product/products.reducer';
import { ContactComponent } from '../contact/contact.component';

@Component({
  selector: 'app-section',
  standalone: true,
  imports: [FilterComponent ,CardModule ,ButtonModule ,ContactComponent],
  templateUrl: './section.component.html',
  styleUrl: './section.component.css'
})
export class SectionComponent implements OnInit {
  product ?: any ;
  products$ : Observable<Product[]>;
  isLoading$ : Observable<boolean>;

  constructor(private router: Router ,private store: Store<AppState>){
    this.products$ = this.store.select(productSelector);
    this.isLoading$ = this.store.select(loadingSelector);
  }

  ngOnInit(): void {
    this.loadDataStore();
    this.products$.subscribe(state =>
      this.product = state
    )
  }

  loadDataStore() {
    this.store.dispatch(loadProducts({ parameters :5 }));
  }

  navigateProduct(element:any) {
    this.router.navigate(['product',element.id]);
  }

  maxTitleLength(name:string) {
    return name.length > 11 ?name.slice(0,11)+"..." :name;
  }
}
