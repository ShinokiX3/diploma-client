import axios from 'axios'

export const axiosAmazon = axios.create({
	// baseURL: process.env.AMAZON_URL,
	baseURL: 'https://api.rainforestapi.com',
	headers: {
		'Content-Type': 'application/json'
	}
})