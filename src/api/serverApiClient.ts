import axios, {
	AxiosHeaders,
	AxiosRequestHeaders,
	InternalAxiosRequestConfig,
} from 'axios';

// TODO: move url to env

export const serverApiClient = axios.create({
	baseURL: 'https://diploma-server.vercel.app/',
	headers: {
		'Content-Type': 'application/json',
	},
});

serverApiClient.interceptors.request.use(
	(config) => {
		// config.headers = {
		// 	authorization: `Bearer ${localStorage.getItem('token')}`,
		// };

		config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

		return config;
	},
	(error) => {}
);

serverApiClient.interceptors.response.use(
	(config) => {
		config.headers = {
			authorization: `Bearer ${localStorage.getItem('token')}`,
		};

		return config;
	},
	(error) => {}
);
