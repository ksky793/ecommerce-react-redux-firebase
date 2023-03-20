import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import productReducer from './features/products/productSlice';
import categoriesReducer from './features/categories/categoriesSlice';
import cartReducer from './features/cart/cartSlice';
const rootReducer = combineReducers({
	auth: authReducer,
	products: productReducer,
	categories: categoriesReducer,
	cart: cartReducer,
});
const store = configureStore({
	reducer: rootReducer,
});

export default store;
