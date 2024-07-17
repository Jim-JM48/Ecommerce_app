import { Component ,OnInit } from '@angular/core';
import { FilterComponent } from '../../components/filter/filter.component';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { Product } from '../../product/product.module';
import { Observable, } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../state/red.store';
import { loadProducts } from '../../state/product/products.action';
import { productSelector, errorSelector } from '../../state/product/products.reducer';
import { ContactComponent } from '../contact/contact.component';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-section',
  standalone: true,
  imports: [FilterComponent ,CardModule ,ButtonModule ,ContactComponent ,AsyncPipe],
  templateUrl: './section.component.html',
  styleUrl: './section.component.css'
})
export class SectionComponent implements OnInit {
  products$ : Observable<Product[]>;
  errorHandler$ ?: Observable<string | null>;

  constructor(private router: Router ,private store: Store<AppState>){

    this.products$ = this.store.pipe(select(productSelector));
    this.errorHandler$ = this.store.pipe(select(errorSelector));
  }

  ngOnInit(): void {
    this.loadDataStore();
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
