// import { EnumSorting } from '@/ui/catalog/sorting/sorting.interface'

import { IProduct } from '@/types/product.interface'

import { axiosClassic } from '@/api/api'

const PRODUCTS = '/products'

export const ProductService = {
	async getAllProducts() {
		const { data } = await axiosClassic.get<IProduct[]>(PRODUCTS)

		return data
	},

	async getOneProduct(productId: number) {
		const { data } = await axiosClassic.get<IProduct>(`${PRODUCTS}/${productId}`)

		return data
	},

	// async bySearchTerm(searchTerm: string) {
	// 	return axiosClassic.get<IProduct[]>(`${PRODUCTS}/search`, {
	// 		params: { searchTerm }
	// 	})
	// },

	// async bySlug(slug: string) {
	// 	return axiosClassic.get<IProduct>(`${PRODUCTS}/slug/${slug}`)
	// },

	// async getRelatives(withoutId: number) {
	// 	return axiosClassic.get<IProduct[]>(`${PRODUCTS}/relatives/${withoutId}`)
	// }
}
