import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { fetchCategories } from '../../../firebase/services/CategoriesService';

const initialState = {
	categories: [],
	loading: false,
	error: null,
};

export const fetchCategoriesAsync = createAsyncThunk(
	'products/fetchCategories',
	async () => {
		const categories = await fetchCategories();
		return categories;
	}
);

const categoriesSlice = createSlice({
	name: 'categories',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchCategoriesAsync.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
				state.loading = false;
				state.error = false;
				state.categories = action.payload;
			})
			.addCase(fetchCategoriesAsync.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});
	},
});

export const {} = categoriesSlice.actions;

export default categoriesSlice.reducer;
