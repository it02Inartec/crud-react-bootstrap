import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';

import './FormClient.css';

// class component
class FormClient extends React.Component {

  constructor(props) {
    super(props)

    this.initialState = {
      firstname: '',
      lastname: '',
      birthday: '',
      gender: '',
      phone: '',
      age: '',
      address: '',
      image: '',
      show: false
    };

    this.state = this.initialState;
  }

  // update input form
  handleChange = event => {
    const { name, value } = event.target;

    this.setState({ [name]: value });

    this.props.characterEdit[name] = value;
  };

  // send data
  submitForm = event => {
    this.props.handleSubmit(this.state, event)
    //this.setState(this.initialState)
  };

  // close modal form
  openModalForm = event => {
    this.props.characterEdit.firstname = "";
    this.props.characterEdit.lastname = "";
    this.props.characterEdit.birthday = "";
    this.props.characterEdit.gender = "";
    this.props.characterEdit.phone = "";
    this.props.characterEdit.age = "";
    this.props.characterEdit.address = "";
    this.props.characterEdit.image = "";
    this.setState({ show: true });
  };

  // close modal form
  closeModalForm = () => {
    this.setState({ show: false });
    this.props.characterEdit.show = false;
  };

  render() {

    const {
      firstname,
      lastname,
      birthday,
      gender,
      phone,
      age,
      address,
      image } = this.props.characterEdit;

    return (
      <div>
        <Button variant="success btn-create" onClick={ this.openModalForm }>
          Create new client
        </Button>
        <Modal
          show={this.state.show || this.props.characterEdit.show}
          onHide={this.closeModalForm}
          dialogClassName="modal-90w"
          aria-labelledby="example-custom-modal-styling-title">
          <Modal.Header closeButton>
            <Modal.Title id="example-custom-modal-styling-title">
              Create new client
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container fluid={false}>
                <Form onSubmit={this.submitForm}>
                  <Row>
                    <Col md={6}>
                      <Form.Group controlId="formPhoto">
                        <Form.Label>Photo (Soon)</Form.Label>
                        <Form.Control
                          type="file"
                          name="image"
                          disabled="true"
                          value={image}
                          onChange={this.handleChange} />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="formLastName">
                        <Form.Label>Last name</Form.Label>
                        <Form.Control
                          type="text"
                          name="lastname"
                          value={lastname}
                          onChange={this.handleChange}
                          placeholder="Enter last name" />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <Form.Group controlId="formFirstName">
                        <Form.Label>First name</Form.Label>
                        <Form.Control
                          type="text"
                          name="firstname"
                          value={firstname}
                          onChange={this.handleChange}
                          placeholder="Enter fist name"
                           />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="formBirthday">
                        <Form.Label>Birthday</Form.Label>
                        <Form.Control
                          type="date"
                          name="birthday"
                          value={birthday}
                          onChange={this.handleChange}
                          placeholder="Enter birthday" />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <Form.Group controlId="formGender">
                        <Form.Label>Gender</Form.Label>
                        <Form.Control
                          type="text"
                          name="gender"
                          value={gender}
                          onChange={this.handleChange}
                          placeholder="Enter name" />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="formPhone">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control
                          type="text"
                          name="phone"
                          value={phone}
                          onChange={this.handleChange}
                          placeholder="Enter phone" />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <Form.Group controlId="formAge">
                        <Form.Label>Age</Form.Label>
                        <Form.Control
                          type="text"
                          name="age"
                          value={age}
                          onChange={this.handleChange}
                          placeholder="Enter age" />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="formAddress">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                          type="text"
                          name="address"
                          value={address}
                          onChange={this.handleChange}
                          placeholder="Enter address" />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Button variant="primary" type="submit" onClick={ () => this.setState({ show: false })}>
                    Submit
                  </Button>
                </Form>
            </Container>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default FormClient;