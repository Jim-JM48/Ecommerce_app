import { createFeatureSelector, createReducer, createSelector, on} from "@ngrx/store";
import { CartState } from "../red.store"
import { loadStored, storeAddProducts, storeDeleteProducts } from "./cart.action";

export const initialState :CartState = {
  cart : [],
  isLoaded : false,
  isDeleted : ''
}

export const cartReducer = createReducer(
  initialState,
  on(loadStored ,(state) => ({...state ,loading :true})),
  on(storeAddProducts ,(state ,{Items}) => ({...state ,
    cart : [...state.cart ,{Items :Items ,uniqueId :Math.floor(Math.random() * 1000)}],
    isLoaded :true})),
  on(storeDeleteProducts ,(state ,{Data}) => ({...state ,
    cart: state.cart.filter((data) => data.uniqueId != Data.uniqueId),
    isDeleted : 'completed'
  }))
);

let cartFs = createFeatureSelector<CartState>('carts');

export let storeSelector = createSelector(cartFs ,(state) => state.cart);
export let storeLengthSelector = createSelector(cartFs ,(state) => state.cart.length);
