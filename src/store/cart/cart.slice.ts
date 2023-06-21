import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import {
	IAddToCartPayload,
	ICartInitialState,
	IChangeQuantityPayload,
} from './cart.types';

const initialState: ICartInitialState = {
	items: [],
};

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		// IAddToCartPayload
		addToCart: (state, action: PayloadAction<any>) => {
			const isExist = state.items.some(
				(item) => item.asin === action.payload.asin
			);

			if (!isExist)
				state.items.push({ ...action.payload, id: state.items.length });
		},
		removeFromCart: (state, action: PayloadAction<{ id: string }>) => {
			state.items = state.items.filter((item) => item.id !== action.payload.id);
		},
		// IChangeQuantityPayload
		changeQuantity: (state, action: PayloadAction<any>) => {
			const { asin, quantity } = action.payload;
			const item = state.items.find((item) => item.asin === asin);
			if (item) {
				item.quantity = quantity;
			}
		},
		clearCart: (state) => {
			state.items = [];
		},
		reset: (state) => {
			state.items = [];
		},
	},
});
