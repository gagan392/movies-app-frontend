const apiBaseURL = 'http://54.210.178.143:8080/api/v1';
const axios = require('axios');

function ApiClient() {}

ApiClient.prototype.getMovies = (filters) => {
	return axios.get(`${apiBaseURL}/movies`, {
			params: filters
		})
		.then(response => {
			return response && response.data;
		}).catch((error) => {
			throw error;
		});
}

ApiClient.prototype.getMovieById = (id) => {
	return axios.get(`${apiBaseURL}/movies/${id}`)
		.then(response => {
			return response && response.data;
		}).catch((error) => {
			throw error;
		});
}

export default ApiClient;