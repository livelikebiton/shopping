import { productsReducer } from './products-state';
import { combineReducers, createStore } from "redux";
import { authReducer } from './auth-state';
import { cardProductsReducer } from './card-product-state';

const reducers = combineReducers({ authState: authReducer, productsState: productsReducer, cardProductsState: cardProductsReducer});
const store = createStore(reducers);

export default store;