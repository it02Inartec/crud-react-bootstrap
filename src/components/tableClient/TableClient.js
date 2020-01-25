import React from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

const TableHeader = () => {
	return (
		<thead>
			<tr>
				<th>First Name</th>
				<th>Last Name</th>
				<th>Birdthday</th>
	        	<th>Gender</th>
	        	<th>Phone</th>
	        	<th>Age</th>
	        	<th>Address</th>
	        	<th>Photo</th>
	        	<th>Action</th>
	        </tr>
	    </thead>
	)
}

const TableBody = props => {
	const rows = props.characterData.map((row, index) => {
		return (
			<tr key={row.id}>
				<td>{row.firstname}</td>
				<td>{row.lastname}</td>
				<td>{row.birthday}</td>
				<td>{row.gender}</td>
				<td>{row.phone}</td>
				<td>{row.age}</td>
				<td>{row.address}</td>
				<td>{row.id_image} - Soon -</td>
				<td>
					<Button variant="primary" onClick={() => props.editCharacter(row.id)}>Edit</Button>
					<Button variant="danger" onClick={() => { if (window.confirm('Are you sure you wish to delete this client?')) props.removeCharacter(row.id) } }>Delete</Button>

				</td>
			</tr>
		)
	});

	return <tbody>{rows}</tbody>
}

class TableClient extends React.Component {
	render() {

		const { characterData, removeCharacter, editCharacter } = this.props;

		return (
			<Table>
				<TableHeader />
				<TableBody
					characterData={characterData}
					removeCharacter={removeCharacter}
					editCharacter={editCharacter} />
			</Table>
		);
	}
}

export default TableClient;