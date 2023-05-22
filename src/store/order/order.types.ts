export interface ISelectedCity {
	title: string;
	ref: string;
}

export interface IOrderInitialState {
	name: string;
	lastname: string;
	phone: string;
	city: ISelectedCity;
	deliveryDepartment: ISelectedCity;
}
