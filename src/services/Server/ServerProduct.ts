import { serverApi } from '@/api/serverApi';
import { IAttributesResponse, IProduct } from '@/types/product.interface';

const PRODUCT = '/products';

// export interface IProduct {
// 	email: string;
// 	password: string;
// 	name: string;
// 	joindate: Date;
// 	phone: string;
// }

export const ProductService = {
	async getAllProducts() {
		try {
			const { data } = await serverApi.get<any>(`${PRODUCT}/all`);

			return data;
		} catch (error) {}
	},

	async getProductsByTerm({ term }: { term: string }) {
		try {
			const { data } = await serverApi.post<any>(`${PRODUCT}/term`, {
				term,
			});

			return data;
		} catch (error) {}
	},

	async getProductById({ id }: { id: string }) {
		try {
			const { data } = await serverApi.post<[IProduct, IAttributesResponse]>(
				`${PRODUCT}/id`,
				{
					id,
				}
			);

			return data;
		} catch (error) {
			return [];
		}
	},

	async getProductsByCategory({ id }: { id: string }) {
		try {
			const { data } = await serverApi.post<{ id: string }>(
				`${PRODUCT}/category`,
				{
					id: id,
				}
			);

			return data;
		} catch (error) {}
	},

	async getProductsPreview() {
		try {
			const { data } = await serverApi.get<IProduct[][]>(`${PRODUCT}/preview`);

			return data;
		} catch (error) {}
	},

	async getAllAttributes() {
		try {
			const { data } = await serverApi.get<any>(`${PRODUCT}/attributes/all`);

			return data;
		} catch (error) {}
	},
};
