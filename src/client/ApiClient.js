const apiBaseURL = 'http://54.210.178.143:8080/api/v1';
const axios = require('axios');

function ApiClient() {}

ApiClient.prototype.getMovies = (filters) => {
	return axios.get(`${apiBaseURL}/movies`, {
			params: filters
		}, {
			headers: {
				"Accept": "application/json",
				"content-type": "application/json"
			}
		})
		.then(response => {
			return response && response.data;
		}).catch((error) => {
			throw error;
		});
}

ApiClient.prototype.getMovieById = (id) => {
	return axios.get(`${apiBaseURL}/movies/${id}`, {}, {
			headers: {
				"Accept": "application/json",
				"content-type": "application/json"
			}
		})
		.then(response => {
			return response && response.data;
		}).catch((error) => {
			throw error;
		});
}

ApiClient.prototype.signup = (formData) => {
	return axios.post(`${apiBaseURL}/signup`, formData, {
			headers: {
				"Accept": "application/json",
				"content-type": "application/json"
			}
		})
		.then(response => {
			return response && response.data;
		}).catch((error) => {
			throw error;
		});
}

ApiClient.prototype.login = (username, password) => {
	return axios.post(`${apiBaseURL}/auth/login`, {}, {
			headers: {
				"Accept": "application/json",
				"Authorization": "Basic " + window.btoa(username + ":" + password),
				"content-type": "application/json"
			}
		})
		.then(response => {
			return response;
		}).catch((error) => {
			throw error;
		});
}

ApiClient.prototype.logout = () => {
	return axios.post(`${apiBaseURL}/auth/logout`, {}, {
			headers: {
				"Accept": "application/json",
				"Authorization": "Bearer " + sessionStorage.getItem("access-token"),
				"content-type": "application/json"
			}
		})
		.then(response => {
			return response;
		}).catch((error) => {
			throw error;
		});
}
export default ApiClient;