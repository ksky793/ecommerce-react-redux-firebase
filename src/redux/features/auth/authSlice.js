import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';

import {
	logInWithEmailAndPassword,
	registerWithEmailAndPassword,
	signInWithGoogle,
} from '../../../firebase/utils';

const initialState = {
	isLoggedIn: localStorage.getItem('user') === 'null' ? false : true,
	loading: false,
	error: null,
	userInfo: JSON.parse(localStorage.getItem('user')) || null,
};

export const signInUser = createAsyncThunk(
	'auth/signInUser',
	async ({ email, password }, { rejectWithValue }) => {
		try {
			const { user } = await logInWithEmailAndPassword(email, password);

			const userData = {
				email: user.email,
				id: user.uid,
				name: user.displayName || '',
			};
			localStorage.setItem('user', JSON.stringify(userData));
			return userData;
		} catch (err) {
			return rejectWithValue(err);
		}
	}
);

export const signUpUser = createAsyncThunk(
	'auth/signUpUser',
	async ({ fullName, email, password }, { rejectWithValue }) => {
		try {
			await registerWithEmailAndPassword(fullName, email, password);
		} catch (err) {
			return rejectWithValue(err);
		}
	}
);

export const signInGoogleUser = createAsyncThunk(
	'auth/signInGoogleUser',
	async ({}, { rejectWithValue }) => {
		try {
			const user = await signInWithGoogle();
			const userData = {
				email: user.email,
				id: user.uid,
				name: user.displayName || '',
			};
			return userData;
		} catch (err) {
			console.log(err);
			return rejectWithValue(err);
		}
	}
);

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		LOGOUT_USER: (state) => {
			state.isLoggedIn = false;
			state.userInfo = null;
			localStorage.setItem('user', null);
		},
	},
	extraReducers: (builder) => {
		// sign in User
		builder.addCase(signInUser.pending, (state) => {
			state.loading = true;
			state.error = false;
		});
		builder.addCase(signInUser.fulfilled, (state, action) => {
			state.isLoggedIn = true;
			state.userInfo = { ...action.payload };
			state.loading = false;
		});
		builder.addCase(signInUser.rejected, (state, action) => {
			state.isLoggedIn = false;
			state.userInfo = null;
			state.error = action.payload;
			state.loading = false;
		});

		// sign up User
		builder.addCase(signUpUser.pending, (state) => {
			state.loading = true;
			state.error = null;
		});
		builder.addCase(signUpUser.fulfilled, (state) => {
			state.loading = false;
		});
		builder.addCase(signUpUser.rejected, (state, action) => {
			state.error = action.payload;
			state.loading = false;
		});

		// sign in with google user
		builder.addCase(signInGoogleUser.pending, (state, action) => {
			state.error = null;
			state.loading = true;
		});
		builder.addCase(signInGoogleUser.fulfilled, (state, action) => {
			state.isLoggedIn = true;
			state.userInfo = { ...action.payload };
			state.loading = false;
			localStorage.setItem('user', JSON.stringify({ ...action.payload }));
		});
		builder.addCase(signInGoogleUser.rejected, (state, action) => {
			state.error = action.payload;
			state.loading = false;
			state.isLoggedIn = false;
			state.userInfo = null;
		});
	},
});

export const { LOGOUT_USER } = authSlice.actions;

// selector functions
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectError = (state) => state.auth.error;
export const selectLoading = (state) => state.auth.loading;

// export const selectUserInfo = (state) => state.auth.userInfo;

export default authSlice.reducer;
