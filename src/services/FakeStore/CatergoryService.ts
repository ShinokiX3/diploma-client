import { IProduct } from '@/types/product.interface';
// import { ICategories } from '@/types/categories.interface'

import { axiosClassic } from '@/api/api';

const CATEGORIES = '/products/categories';
const CATEGORY = '/products/category';

export const CategoryService = {
	async getAllCategories() {
		const { data } = await axiosClassic.get<string[]>(CATEGORIES);

		return data;
	},

	async getByCategory(categoryTitle: string) {
		const { data } = await axiosClassic.get<IProduct[]>(
			`${CATEGORY}/${categoryTitle}`
		);

		return data;
	},
};
