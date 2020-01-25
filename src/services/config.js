import axios from 'axios';

const BASE_URL = 'http://api-crud-laravel.test/';

const API = axios.create({
	baseURL: BASE_URL
});

export default API;

