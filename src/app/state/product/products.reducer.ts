import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { loadProducts, loadProductsFailure, loadProductsSuccess} from './products.action';
import { ProductState } from '../red.store';

export const initialState :ProductState = {
  products : [],
  loading: '',
  error: null,
}

export const productReducer = createReducer(
  initialState,
  on(loadProducts ,(state) => ({...state ,loading :'pending'})),
  on(loadProductsSuccess, (state, { products }) =>({ ...state,
    products : products,
    loading: 'success' })),
  on(loadProductsFailure, (state, { error }) => ({ ...state, error : error, loading: 'failed' })),

);

let productFs = createFeatureSelector<ProductState>('products');

export let loadingSelector = createSelector(productFs ,state => state.loading);
export let productSelector = createSelector(productFs ,(state) => state.products);
export let errorSelector = createSelector(productFs ,(state) => state.error);
