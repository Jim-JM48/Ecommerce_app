import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ProductsService } from "../../service/products.service";
import { loadProducts, loadProductsFailure, loadProductsSuccess } from "./products.action";
import { catchError, exhaustMap, map, of } from "rxjs";

@Injectable()
export class ProductEffects {
  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProducts({}).type),
      exhaustMap((action :any) =>
        this.productService.getProducts(`https://fakestoreapi.com/products${action.id ? "/"+action.id :''}${action.cate ? "/category/"+action.cate :""}`,{limit : action.parameters}).pipe(
          map((products) => loadProductsSuccess({products})),
          catchError((error) =>
            of(loadProductsFailure({error :error.message})))
      ))
  ))
  constructor(private actions$:Actions ,private productService:ProductsService) {}
}
