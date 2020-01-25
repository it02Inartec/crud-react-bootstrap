import React from "react";
import Alert from 'react-bootstrap/Alert';
import './index.css';

import FormClient from './components/formClient/FormClient';
import TableClient from './components/tableClient/TableClient';
import ClientService from './services/ClientService';


class App extends React.Component {

	constructor(props) {

		super(props);

		// init variables
		this.initialState = {
			characters: [],
			characterEdit: {
				firstname: '',
			    lastname: '',
			    birthday: '',
			    gender: '',
			    phone: '',
			    age: '',
			    address: '',
			    image: '',
			},
			successDelete: false,
			errorDelete: false,
			successSubmit: false,
			errorSubmit: false
		};

		// Deep Clone
		this.state = Object.assign({}, JSON.parse(JSON.stringify(this.initialState)));

		// for close setTimeOut
		this.timeId = null;
	}

	componentDidMount() {
	    this.getListClients();
	}

	// get all clients from database
	getListClients = characters => {
		ClientService.getList()
		.then(res => {
			const characters = res.data;
			this.setState({ characters });
		})
	};

	// delete a client
	removeCharacter = id => {

		ClientService.delete(id)
	    .then(res => {
	    	this.setState({successDelete: true});
			this.timeId = setTimeout(()=> this.setState({successDelete: false}), 3000);
			this.getListClients();
	    }, err => {
	    	this.setState({errorDelete: true});
			this.timeId = setTimeout(()=> this.setState({errorDelete: false}), 3000);
	    	console.log(err)
	    })
	};

	// send data to database
	handleSubmit = (dat, event) => {

		event.preventDefault();

		// insert data to variable client, if event is update client or new client to database
	    let client = {
			firstname: this.state.characterEdit.firstname ? this.state.characterEdit.firstname : dat.firstname,
			lastname: this.state.characterEdit.lastname ? this.state.characterEdit.lastname : dat.lastname,
			birthday: this.state.characterEdit.birthday ? this.state.characterEdit.birthday : dat.birthday,
			gender: this.state.characterEdit.gender ? this.state.characterEdit.gender : dat.gender,
			phone: this.state.characterEdit.phone ? this.state.characterEdit.phone : dat.phone,
			age: this.state.characterEdit.age ? this.state.characterEdit.age : dat.age,
			address: this.state.characterEdit.address ? this.state.characterEdit.address : dat.address,
			image: this.state.characterEdit.image ? this.state.characterEdit.image : dat.image,
	    };

	    // if it exists id, so event is update
	    if (this.state.characterEdit.id) {

	  		client.id = this.state.characterEdit.id;

	  		// call service update
	    	ClientService.update(client.id, client)
		    .then(res => {

		    	// show alert success
		    	this.setState({successSubmit: true});

		    	// hide success alert after 3 seconds
				this.timeId = setTimeout(()=> this.setState({successSubmit: false}), 3000);

				// reload table
		    	this.getListClients();

		    	// clean form
		    	this.setState({ characterEdit: this.initialState.characterEdit });

		    }, err => {
		    	// show alert error
		    	this.setState({errorSubmit: true});

		    	// hide error alert after 3 seconds
				this.timeId = setTimeout(()=> this.setState({errorSubmit: false}), 3000);
		    })

	    } else {

	    	// call service save
	    	ClientService.save(client)
		    .then(res => {

		    	// show alert success
		    	this.setState({successSubmit: true});

		    	// hide success alert after 3 seconds
				this.timeId = setTimeout(()=> this.setState({successSubmit: false}), 3000);

				// reload table
		    	this.getListClients();

		    	// clean form
		    	this.setState({ characterEdit: this.initialState.characterEdit });

		    }, err => {
		    	// show alert error
		    	this.setState({errorSubmit: true});

		    	// hide error alert after 3 seconds
				this.timeId = setTimeout(()=> this.setState({errorSubmit: false}), 3000);
		    })
	    }

	};

	// load form data
	editCharacter = id => {

		// call service get
		ClientService.get(id)
	    .then(res => {

	    	// load data to variable characterEdit (this data for the form)
	    	const characterEdit = {
				firstname: res.data.firstname,
				lastname: res.data.lastname,
				birthday: res.data.birthday,
				gender: res.data.gender,
				phone: res.data.phone,
				age: res.data.age,
				address: res.data.address,
				image: res.data.id_image?res.data.id_image:'',
				id: res.data.id?res.data.id:'',
				show: true
		    };

		    // change characterEdit with new data
	    	this.setState({ characterEdit: characterEdit });
	    })
	};

	componentWillUnmount() {
		// clean setTimeOut
	    clearTimeout(this.timeId);
	}

  	render() {
	    return (
	      	<div className="div-content">
				<FormClient
					characterEdit={this.state.characterEdit}
					handleSubmit={this.handleSubmit} />

				<Alert show={this.state.successSubmit} variant="success"> Saved </Alert>
			 	<Alert show={this.state.errorSubmit} variant="danger"> Not Saved </Alert>

	      		<Alert show={this.state.successDelete} variant="success"> Deleted </Alert>
			 	<Alert show={this.state.errorDelete} variant="danger"> Not deleted </Alert>
				<TableClient
					characterData={this.state.characters}
					removeCharacter={this.removeCharacter}
					editCharacter={this.editCharacter} />
			</div>
	    );
  	}
}

export default App;