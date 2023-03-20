import { createSlice } from '@reduxjs/toolkit';
import {
	getCartItemsFromLocalStorage,
	saveCartItemsToLocalStorage,
	clearCartItemsFromLocalStorage,
} from './cartUtils';

const initialState = {
	cartItems: getCartItemsFromLocalStorage(),
};

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addItemToCart(state, action) {
			console.log(action.payload.productId);
			const itemIndex = state.cartItems.findIndex(
				(item) => item.productId === action.payload.productId
			);
			if (itemIndex >= 0) {
				state.cartItems[itemIndex].quantity = action.payload.quantity;
			} else {
				state.cartItems.push(action.payload);
			}
			saveCartItemsToLocalStorage(state.cartItems);
		},

		removeItemFromCart(state, action) {
			state.cartItems = state.cartItems.filter(
				(item) => item.productId !== action.payload
			);
			saveCartItemsToLocalStorage(state.cartItems);
		},
		clearCart: (state) => {
			state.cartItems = [];
			clearCartItemsFromLocalStorage();
		},
	},
});

export const { addItemToCart, removeItemFromCart, clearCart } =
	cartSlice.actions;

export default cartSlice.reducer;
