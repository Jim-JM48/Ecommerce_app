import { Component ,OnInit } from '@angular/core';
import { CommonModule, AsyncPipe ,SlicePipe } from '@angular/common';
import { Router } from '@angular/router';
import { Observable, } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { FilterComponent } from '../filter/filter.component';
import { SkeletonComponent } from '../skeleton/skeleton.component';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { Product } from '../../../product/product.module';
import { AppState } from '../../../state/red.store';
import { loadProducts } from '../../../state/product/products.action';
import { productSelector } from '../../../state/product/products.reducer';

@Component({
    selector: 'app-section',
    imports: [CommonModule, FilterComponent ,SkeletonComponent, CardModule, ButtonModule, AsyncPipe ,SlicePipe],
    templateUrl: './section.component.html',
    styleUrl: './section.component.css'
})
export class SectionComponent implements OnInit {
  products$ : Observable<Product[]>;

  constructor(private router: Router ,private store: Store<AppState>){

    this.products$ = this.store.pipe(select(productSelector));
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

}
