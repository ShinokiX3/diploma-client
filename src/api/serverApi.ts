import axios from 'axios';

export const serverApi = axios.create({
	baseURL: 'http://localhost:3000',
	headers: {
		'Content-Type': 'application/json',
	},
});

// serverApi.interceptors.request.use(
// 	(config) => {
// 		config.headers = {
// 			authorization: `Bearer ${''}`,
// 		};

// 		return config;
// 	},
// 	(error) => {}
// );

// serverApi.interceptors.response.use(
// 	(config) => {
// 		config.headers = {
// 			authorization: `Bearer ${''}`,
// 		};

// 		return config;
// 	},
// 	(error) => {}
// );
