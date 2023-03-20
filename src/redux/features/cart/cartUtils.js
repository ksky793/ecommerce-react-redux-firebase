const CART_STORAGE_KEY = 'cartItems';

export const getCartItemsFromLocalStorage = () => {
	const cartItems = JSON.parse(localStorage.getItem(CART_STORAGE_KEY));
	return cartItems ? cartItems : [];
};

export const saveCartItemsToLocalStorage = (cartItems) => {
	localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
};

export const clearCartItemsFromLocalStorage = () => {
	localStorage.removeItem(CART_STORAGE_KEY);
};
