import { axiosNovaposhta } from '@/api/novaposhtaApi';
import {
	ICitiesResponse,
	ICitiesResponseError,
} from '@/types/novaposhta.interface';

const CATEGORY = '/';
const API_KEY = '1adc157a5ba67e26e330b15cbae9e2c7';

const withApiKey = () => {
	return `${CATEGORY}`;
};

export const NovaPoshta = {
	async searchByTerm(
		term: string
	): Promise<ICitiesResponse | ICitiesResponseError> {
		try {
			const { data } = await axiosNovaposhta.post<ICitiesResponse>(
				`${withApiKey()}`,
				{
					apiKey: API_KEY,
					modelName: 'Address',
					calledMethod: 'getCities',
					// calledMethod: 'getSettlements',
					methodProperties: {
						FindByString: term,
						Warehouse: 1,
						Limit: '50',
						Page: '1',
						Adress: 1,
					},
				}
			);

			// TODO: Check for errors

			return data;
		} catch (error) {
			return {
				success: false,
				data: [],
				errors: [],
				warnings: [],
				info: [],
				messageCodes: [],
				errorCodes: [],
				warningCodes: [],
				infoCodes: [],
			};
		}
	},

	async searchDepartment(ref: string) {
		try {
			const { data } = await axiosNovaposhta.post<any>(`${withApiKey()}`, {
				apiKey: API_KEY,
				modelName: 'Address',
				calledMethod: 'getWarehouses',
				methodProperties: {
					CityRef: ref,
					Limit: '50',
					Page: '1',
				},
			});

			// TODO: Checkout for errors

			return data;
		} catch (error) {
			return [];
		}
	},
};

// async searchDepartment(term: string) {
// 	try {
// 		const { data } = await axiosNovaposhta.post<any>(`${withApiKey()}`, {
// 			apiKey: API_KEY,
// 			modelName: 'Address',
// 			calledMethod: 'getCities',
// 			methodProperties: {
// 				CityName: term,
// 				Limit: '50',
// 				Page: '1',
// 			},
// 		});

// 		// TODO: Checkout for errors

// 		return data;
// 	} catch (error) {
// 		return [];
// 	}
// },
