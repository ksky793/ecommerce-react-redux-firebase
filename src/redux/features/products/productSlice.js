import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
	addProduct,
	fetchProducts,
	removeProduct,
	fetchProductById,
} from '../../../firebase/services/ProductService';

const initialState = {
	products: [],
	selectedProduct: null,
	loading: false,
	error: null,
};

export const addProductAsync = createAsyncThunk(
	'products/addProduct',
	async (product) => {
		const newProduct = await addProduct(product);
		return newProduct;
	}
);
export const fetchProductsAsync = createAsyncThunk(
	'products/fetchProducts',
	async () => {
		const products = await fetchProducts();
		return products;
	}
);
export const removeProductAsync = createAsyncThunk(
	'products/removeProduct',
	async (productId) => {
		await removeProduct(productId);
		return productId;
	}
);
export const fetchProductByIdAsync = createAsyncThunk(
	'products/fetchProductById',
	async (productId) => {
		const product = await fetchProductById(productId);
		return product;
	}
);

const productSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			// add product
			.addCase(addProductAsync.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(addProductAsync.fulfilled, (state, action) => {
				state.loading = false;
				state.error = false;
				state.products.push(action.payload);
			})
			.addCase(addProductAsync.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			// fetch products
			.addCase(fetchProductsAsync.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchProductsAsync.fulfilled, (state, action) => {
				state.loading = false;
				state.products = action.payload;
			})
			.addCase(fetchProductsAsync.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			// remove products
			.addCase(removeProductAsync.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(removeProductAsync.fulfilled, (state, action) => {
				state.loading = false;
				state.products = state.products.filter((p) => p.id !== action.payload);
			})
			.addCase(removeProductAsync.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			// get product by id
			.addCase(fetchProductByIdAsync.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
				state.loading = false;
				state.selectedProduct = action.payload;
			})
			.addCase(fetchProductByIdAsync.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});
	},
});

export const {} = productSlice.actions;

// selector functions
export const selectProducts = (state) => state.auth.products;
export const selectLoading = (state) => state.auth.loading;
export default productSlice.reducer;
