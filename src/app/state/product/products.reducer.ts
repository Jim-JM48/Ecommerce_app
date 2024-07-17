import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { loadProducts, loadProductsFailure, loadProductsSuccess} from './products.action';
import { ProductState } from '../red.store';

export const initialState :ProductState = {
  products: [],
  loading: false,
  error: '',
}

export const productReducer = createReducer(
  initialState,
  on(loadProducts ,(state) => ({...state ,loading :true})),
  on(loadProductsSuccess, (state, { products}) =>({ ...state,
    products : products,
    loading: false })),
  on(loadProductsFailure, (state, { error }) => ({ ...state, error, loading: false })),

);

let productFs = createFeatureSelector<ProductState>('products');

export let productSelector = createSelector(productFs ,state => state.products);
export let loadingSelector = createSelector(productFs ,state => state.loading);
