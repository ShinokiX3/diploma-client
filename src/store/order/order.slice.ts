import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { IOrderInitialState, ISelectedCity } from './order.types';

const initialState: IOrderInitialState = {
	name: '',
	lastname: '',
	phone: '',
	city: {
		title: '',
		ref: '',
	},
	deliveryDepartment: {
		title: '',
		ref: '',
	},
};

export const orderSlice = createSlice({
	name: 'order',
	initialState,
	reducers: {
		setName: (state, action: PayloadAction<{ name: string }>) => {
			state.name = action.payload.name;
		},

		setLastname: (state, action: PayloadAction<{ lastname: string }>) => {
			state.lastname = action.payload.lastname;
		},

		setPhone: (state, action: PayloadAction<{ phone: string }>) => {
			state.phone = action.payload.phone;
		},

		setCity: (state, action: PayloadAction<{ title: string; ref: string }>) => {
			state.city.title = action.payload.title;
			state.city.ref = action.payload.ref;
		},

		setDeliveryDepartment: (
			state,
			action: PayloadAction<{ title: string; ref: string }>
		) => {
			state.deliveryDepartment.title = action.payload.title;
			state.deliveryDepartment.ref = action.payload.ref;
		},

		reset: (state) => {
			state = initialState;
		},
	},
});
