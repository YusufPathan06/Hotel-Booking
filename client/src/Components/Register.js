/*eslint-disable*/

import React, { Fragment } from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { Redirect, Link } from 'react-router-dom';
import '../App.css';

class Register extends React.Component {
  state = {
    name: '',
    email: '',
    password: '',
    message: '',
  };

  HandleName = (name) => {
    this.setState({
      name: name,
    });
  };

  HandleEmail = (email) => {
    this.setState({
      email: email,
    });
  };

  HandlePassword = (password) => {
    this.setState({
      password: password,
    });
    console.log(this.state);
  };

  HandleMobile = (mobile) => {
    this.setState({
      mobile: mobile,
    });
  };

  HandleSubmit = async (e) => {
    e.preventDefault();
    let response = await axios.post('/user', {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      mobile: this.state.mobile,
    });
    console.log(response.data)
    this.setState({
      message: response.data.message,
    });
  };

  render = () => {
    return (
      <Fragment>
        <Card>
          <Card.Body>
            <Card.Title>Login</Card.Title>
            <Form onSubmit={this.HandleSubmit}>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter name'
                  onChange={(event) => {
                    this.HandleName(event.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group controlId='formBasicEmail'>
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type='email'
                  placeholder='Enter email'
                  onChange={(event) => {
                    this.HandleEmail(event.target.value);
                  }}
                />
                <Form.Text className='text-muted'>
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group controlId='formBasicPassword'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='Password'
                  onChange={(event) => {
                    this.HandlePassword(event.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Mobile Number</Form.Label>
                <Form.Control
                  type='number'
                  placeholder='Mobile No.'
                  onChange={(event) => {
                    this.HandleMobile(event.target.value);
                  }}
                />
              </Form.Group>
              <Button variant='primary' type='submit'>
                Submit
              </Button>
            </Form>
            <br />
            {this.state.message == 'created successfully' && (
              <div>
                <Alert variant='success'>{this.state.message}</Alert>
                <Redirect to='/login' />
              </div>
            )}
            {this.state.message == 'user exists' && (
              <Alert variant='warning'>{this.state.message}</Alert>
            )}
            {this.state.message == 'user exists' && (
              <Alert variant='warning'>{this.state.message}</Alert>
            )}
            <Card.Text>
              Already Registered <Link to='/'>Login</Link>
            </Card.Text>
          </Card.Body>
        </Card>
      </Fragment>
    );
  };
}

export default Register;
