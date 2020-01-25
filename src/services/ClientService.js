import API from './config';

const MOVIES_ENDPOINTS = {
	CLIENTS: "api/clients",
}

const ClientService = {
	getList: () => new Promise(
		(resolve, reject) => {
			API.get(MOVIES_ENDPOINTS.CLIENTS)
			.then( res => resolve(res) )
			.catch( err => reject(err) )
		}
	),
	get: (id) => new Promise(
		(resolve, reject) => {
			API.get(MOVIES_ENDPOINTS.CLIENTS+'/'+id)
			.then( res => resolve(res) )
			.catch( err => reject(err) )
		}
	),
	save: (params) => new Promise(
		(resolve, reject) => {
			API.post(MOVIES_ENDPOINTS.CLIENTS, params)
			.then( res => resolve(res) )
			.catch( err => reject(err) )
		}
	),
	update: (id, params) => new Promise(
		(resolve, reject) => {
			API.put(MOVIES_ENDPOINTS.CLIENTS+'/'+id, params)
			.then( res => resolve(res) )
			.catch( err => reject(err) )
		}
	),
	delete: (id) => new Promise(
		(resolve, reject) => {
			API.delete(MOVIES_ENDPOINTS.CLIENTS+'/'+id)
			.then( res => resolve(res) )
			.catch( err => reject(err) )
		}
	)
}

export default ClientService;