export interface ISelectedCity {
	title: string;
	ref: string;
}

export interface IOrderInitialState {
	name: string;
	phone: string;
	city: ISelectedCity;
}
