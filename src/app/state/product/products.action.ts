import { createAction,props } from "@ngrx/store";
import { Product } from "../../product/product.module";

export const loadProducts = createAction('[Product] Load Product' ,props<{ id ?: number,parameters ?: number ,cate ?: string}>());
export const loadProductsSuccess = createAction('[Product] Load Todos Success', props<{ products : Product[] }>());
export const loadProductsFailure = createAction('[Product] Load Todos Failure', props<{ error: string }>());
