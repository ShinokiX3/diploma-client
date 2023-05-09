import { IAmazonCategory } from '../../types/categories.interface';
import { ICategoryInitialState } from './category.types'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: ICategoryInitialState = {
	categories: []
}

export const categorySlice = createSlice({
	name: 'category',
	initialState,
	reducers: {
		setCategoryData: (state, action: PayloadAction<IAmazonCategory[]>) => {
			state.categories = action.payload;
		},
		changeCategory: (state, action: PayloadAction<IAmazonCategory>) => {
			const { id } = action.payload;
			state.categories = state.categories.map(category => {
				if (category.id !== id) return category 
				else return action.payload
			})
		},
		reset: state => {
			state.categories = []
		}
	}
})
