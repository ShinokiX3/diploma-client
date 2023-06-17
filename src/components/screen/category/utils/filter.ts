import { TFilter } from '@/store/product/product.types';
import { IProduct } from '@/types/product.interface';

type TData = IProduct & TFilter & { strength: string[]; capacity: string[] };

export default function filterByValue(data: TData[], filter: TFilter) {
	if (
		JSON.stringify(filter) !==
		'{"brand":[],"capacities":[],"kind":[],"manufacturer":[],"packing":[],"strengths":[]}'
	) {
		const products = data.filter((product) => {
			const isBrand = filter.brand.some(
				(brand: string) => product.brand[0] === brand
			);
			const isKind = filter.kind.some(
				(kind: string) => product.kind[0] === kind
			);
			const isManufacturer = filter.manufacturer.some(
				(manufacturer: string) => product.manufacturer[0] === manufacturer
			);
			const isStrength = filter.strengths.some(
				(strength: string) => product.strength[0] === strength
			);
			const isCapacity = filter.capacities.some(
				(capacity: string) => product.capacity[0] === capacity
			);
			const isPacking = filter.packing.some(
				(packing: string) => product.packing[0] === packing
			);
			return (
				isBrand ||
				isKind ||
				isManufacturer ||
				isStrength ||
				isCapacity ||
				isPacking
			);
		});
		return products;
	} else return data;
}
