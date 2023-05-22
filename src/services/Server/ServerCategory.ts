import { serverApi } from '@/api/serverApi';

const CATEGORIES = '/categories';

export const CategoryService = {
	async getAllCategories() {
		try {
			const { data } = await serverApi.get<any>(`${CATEGORIES}/all`);

			return data;
		} catch (error) {}
	},
};
