import axios from 'axios';

export const serverApiClient = axios.create({
	baseURL: 'http://localhost:3000',
	headers: {
		'Content-Type': 'application/json',
	},
});

serverApiClient.interceptors.request.use(
	(config) => {
		config.headers = {
			authorization: `Bearer ${localStorage.getItem('token')}`,
		};

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
