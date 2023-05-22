import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { IProductInitialState } from './product.types';

const initialState: IProductInitialState = {
	sort: {},
	filter: {
		brand: [],
		capacities: [],
		kind: [],
		manufacturer: [],
		packing: [],
		strengths: [],
	},
};

export const productSlice = createSlice({
	name: 'product',
	initialState,
	reducers: {
		setSort: (state, action: PayloadAction<{ type: string }>) => {
			state.sort = { type: action.payload.type };
		},

		setFilter: (
			state,
			action: PayloadAction<{ type: string; value: string[] }>
		) => {
			state.filter[action.payload.type] = action.payload.value;
		},

		reset: (state) => {
			state.sort = {};
			state.filter = {};
		},
	},
});
