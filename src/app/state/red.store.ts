import { Action, ActionReducer } from "@ngrx/store";
import { Cart, Product } from "../product/product.module";
import { productReducer } from "./product/products.reducer";
import { ProductEffects } from "./product/products.effect";
import { cartReducer } from "./cart/cart.reducer";

export interface ProductState {
  products : Product[]
  loading : string
  error: string | null
}

export interface CartState {
  cart : Cart[]
  isLoaded : boolean
  isDeleted : string
}

export interface AppState {
  product : ProductState
  cart : CartState
}

export interface AppStore {
  products : ActionReducer<ProductState ,Action>;
  carts : ActionReducer<CartState ,Action>;
}

export const appStore:AppStore = {
  products : productReducer,
  carts : cartReducer
}

export const appEffects = [ProductEffects];
