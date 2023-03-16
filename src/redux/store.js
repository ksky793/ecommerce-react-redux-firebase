import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import productReducer from './features/products/productSlice';
const rootReducer = combineReducers({
	auth: authReducer,
	products: productReducer,
});
const store = configureStore({
	reducer: rootReducer,
});

export default store;
