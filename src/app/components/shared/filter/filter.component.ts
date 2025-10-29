import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SelectModule } from 'primeng/select';
import { AppState } from '../../../state/red.store';
import { Store } from '@ngrx/store';
import { loadProducts } from '../../../state/product/products.action';
import { productSelector } from '../../../state/product/products.reducer';


interface Category {
  name: string;
  cate: string;
}

@Component({
    selector: 'app-filter',
    imports: [FormsModule, SelectButtonModule, SelectModule],
    templateUrl: './filter.component.html',
    styleUrl: './filter.component.css'
})
export class FilterComponent {

  selectedCategory ?: Category ;
  value !: number;
  filterState$ !: Observable<any>;
  buttonunSelect = signal<boolean>(false);

  stateOptions: any[] = [
    { name: 'Show 10 Items', value: 1 ,param : 10},
    { name: 'Show All Items', value: 2 ,param : 0}
  ];

  category : Category[] = [
    {name : "All Item's" ,cate : "../"},
    {name : "Men's Cloth" ,cate : "men's clothing"},
    {name : "Women's Cloth" ,cate : "women's clothing"},
    {name : "Jewelery" ,cate : "jewelery"},
    {name : "Electronics" ,cate : "electronics"}
  ];

  constructor(private store: Store<AppState>){
    this.filterState$ = this.store.select(productSelector);
  }


  buttonFilterFn(myStatus : string) {
    let myTarget = this.stateOptions[this.value -1];
    return myStatus === "Show 10 Items"||"Show All Items" ? this.store.dispatch(loadProducts({parameters : myTarget.param})) : "";
  }

  dropDownFilterFn(){
    this.buttonunSelect.set(true);
    if (this.selectedCategory) {
      this.store.dispatch(loadProducts({cate : this.selectedCategory?.cate}));
    }else {
      this.buttonunSelect.set(false);
      this.value ? this.buttonFilterFn(this.stateOptions[this.value - 1].name) :'';
    }
  }
}
