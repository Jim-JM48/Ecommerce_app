import { Routes } from '@angular/router';
import { ProductComponent } from './components/pages/product/product.component';
import { HomeComponent } from './components/core/home/home.component';
import { CartComponent } from './components/pages/cart/cart.component';
import { NotfoundComponent } from './components/pages/notfound/notfound.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {path: "product/:id",component: ProductComponent},
  {path: "cart",component: CartComponent},
  {path : '**' ,component : NotfoundComponent}
];
