import { Routes } from '@angular/router';
import { ProductComponent } from './components/product/product.component';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', redirectTo: '', pathMatch: 'full' },
  {path: "product/:id",component: ProductComponent},
  {path: "cart",component: CartComponent}
];
