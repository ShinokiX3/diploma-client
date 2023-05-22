import { serverApi } from '@/api/serverApi';
import { serverApiClient } from '@/api/serverApiClient';

const USER = '/users';

export const UserService = {
	// Order

	async createOrder(order: any, user: any) {
		try {
			const { data } = await serverApiClient.post<any>(`${USER}/order/create`, {
				order,
				user,
			});

			return data;
		} catch (error) {}
	},

	async getUserOrders() {
		try {
			const { data } = await serverApiClient.get<any>(`${USER}/order/user`);

			return data;
		} catch (error) {}
	},

	// Favourite

	async getAllFromFavourites(id: string) {
		try {
			const { data } = await serverApiClient.post<any>(
				`${USER}/favourite/push`,
				{
					id,
				}
			);

			return data;
		} catch (error) {}
	},

	async pushFavourite(id: string) {
		try {
			const { data } = await serverApiClient.post<any>(
				`${USER}/favourite/push`,
				{
					id,
				}
			);

			return data;
		} catch (error) {}
	},

	async removeFavourite(id: string) {
		try {
			const { data } = await serverApiClient.delete<any>(
				`${USER}/favourite/remove`,
				{
					data: {
						id: id,
					},
				}
			);

			return data;
		} catch (error) {}
	},
};
