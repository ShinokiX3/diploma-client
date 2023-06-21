import { TFilter } from '@/store/product/product.types';
import { IProduct } from '@/types/product.interface';

type TFilterAdditional = { strength: string[]; capacity: string[] };

type TData = IProduct & TFilter & TFilterAdditional;

export default function sortByValue(
	data: TData[],
	value: string
): TData[] | null {
	switch (value) {
		case 'by_title_a':
			return data.sort((a, b) => {
				if (a.title > b.title) return 1;
				if (a.title < b.title) return -1;
				return 0;
			});
		case 'by_title_z':
			return data.sort((a, b) => {
				if (a.title > b.title) return -1;
				if (a.title < b.title) return 1;
				return 0;
			});
		case 'by_cost_l':
			return data.sort((a, b) => {
				const costA = a.discount ? a.cost - a.discount * a.cost : a.cost;
				const costB = b.discount ? b.cost - b.discount * b.cost : b.cost;

				if (costA > costB) return -1;
				if (costA < costB) return 1;
				return 0;
			});
		case 'by_cost_h':
			return data.sort((a, b) => {
				const costA = a.discount ? a.cost - a.discount * a.cost : a.cost;
				const costB = b.discount ? b.cost - b.discount * b.cost : b.cost;

				if (costA > costB) return 1;
				if (costA < costB) return -1;
				return 0;
			});
		case 'by_discount':
			return data.sort((a, b) => {
				if (a.discount > b.discount) return -1;
				if (a.discount < b.discount) return 1;
				return 0;
			});
		case 'by_new':
			return data.sort((a, b) => {
				if (a.isNew) return -1;
				if (!a.isNew) return 1;
				return 0;
			});

		default:
			return null;
	}
}
