export interface IUser {
	email: string;
	favourites: Array<any>;
	joindate: string;
	name: string;
	password: string;
	phone: string;
	role: string[];
	__v: number;
	_id: string;
}

export interface IUserInitialState {
	upperDrawer: boolean;
	token: string;
	user: IUser;
}
