import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { IOrderInitialState, ISelectedCity } from './order.types';

const initialState: IOrderInitialState = {
	name: '',
	phone: '',
	city: {
		title: '',
		ref: '',
	},
};

export const orderSlice = createSlice({
	name: 'order',
	initialState,
	reducers: {
		setCity: (state, action: PayloadAction<ISelectedCity>) => {
			state.city = action.payload;
		},

		reset: (state) => {
			state = initialState;
		},
	},
});
