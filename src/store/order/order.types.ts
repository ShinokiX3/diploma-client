export interface ISelectedCity {
	title: string;
	ref: string;
}

interface IOrderProduct {
	id: string;
	cost: number;
	total: number;
	quantity: number;
}

export interface IOrder {
	name: string;
	lastname: string;
	phone: string;
	city: ISelectedCity;
	deliveryDepartment: ISelectedCity;
	products: IOrderProduct[];
}

export interface IOrderResponse {
	_id: string;
	name: string;
	lastname: string;
	tel: string;
	city: ISelectedCity;
	deliveryDepartment: ISelectedCity;
	total: number;
	products: IOrderProduct[];
	status: string;
	date: Date;
	user?: string;
}

export type IOrderInitialState = {} & IOrder;
