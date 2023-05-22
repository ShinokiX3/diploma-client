export interface IProduct {
	_id: string;
	code: string;
	title: string;
	description: string;
	picture: string;
	cost: number;
	discount: number;
	isNew: boolean;
	inStockQuantity: 5;
	category: string[];
	__v: number;
}

export interface IAttribute {
	_id: string;
	value: string;
}

export interface IAttributesResponse {
	brand: IAttribute[];
	capacity: IAttribute[];
	strength: IAttribute[];
	kind: IAttribute[];
	manufacturer: IAttribute[];
	packing: IAttribute[];
}
