import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { IUser, IUserInitialState } from './user.types';

const initialState: IUserInitialState = {
	upperDrawer: false,
	token: '',
	user: {},
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		login: (state, action: PayloadAction<{ token: string; user: IUser }>) => {
			const { token, user } = action.payload;
			state.token = token;
			state.user = user;
		},

		quit: (state, _) => {
			state.token = '';
			state.user = {};
		},

		pushFavourite: (state, action: PayloadAction<{ id: string }>) => {
			state.user.favourites = [...state.user.favourites, action.payload.id];
		},

		removeFavourite: (state, action: PayloadAction<{ id: string }>) => {
			state.user.favourites = state.user.favourites.filter(
				(item) => item !== action.payload.id
			);
		},

		toggleUpperDrawer: (state, action: PayloadAction<boolean>) => {
			state.upperDrawer = action.payload;
		},

		reset: (state) => {
			state.upperDrawer = false;
		},
	},
});
