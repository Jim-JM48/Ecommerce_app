import { createAction, props } from "@ngrx/store";


export const loadStored = createAction('[Store] Load Stored')
export const storeAddProducts = createAction('[Store] StoreAdd Product' ,props<{ Items ?: any}>())
export const storeDeleteProducts = createAction('[Store] StoreDelete Product' ,props<{ Data ?: any }>())
