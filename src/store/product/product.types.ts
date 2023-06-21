export interface IMap {
	[key: string]: string[];
}

export type TFilter = {
	brand: string[];
	kind: string[];
	capacities: string[];
	strengths: string[];
	manufacturer: string[];
	packing: string[];
} & IMap;

export interface ISort {
	type:
		| 'by_title_a'
		| 'by_title_z'
		| 'by_cost_l'
		| 'by_cost_h'
		| 'by_discount'
		| 'by_new';
}

export interface IProductInitialState {
	sort: ISort | {};
	filter: TFilter;
}
