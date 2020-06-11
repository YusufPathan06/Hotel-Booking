/*eslint-disable*/

import React, { Fragment } from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { Redirect, Link } from 'react-router-dom';
import '../App.css';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    message: '',
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

  HandleSubmit = async (e) => {
    e.preventDefault();
    let message;
    if (this.state.email == 'admin@admin.com' && this.state.password == 'admin'){
      return (window.location.replace('/admin'))
    }
      axios
        .get(
          '/user/user?email=' +
            this.state.email +
            '&' +
            'password=' +
            this.state.password
        )
        .then((res) => {
          this.setState({
            message: res.data,
          });
          console.log(res.data);

          window.localStorage.setItem('name', res.data.user.name);
          window.localStorage.setItem('id', res.data.user._id);
          window.localStorage.setItem('email', res.data.user.email);
        })
        .catch((err) => {
          this.setState({
            message: 'incorrect',
          });
        });
  };

  render = () => {
    return (
      <Fragment>
        <Card>
          <Card.Body>
            <Card.Title>Login</Card.Title>
            <Form onSubmit={this.HandleSubmit}>
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
              <Button variant='primary' type='submit'>
                Submit
              </Button>
            </Form>
            <br />
            {this.state.message == 'success' && (
              <div>
                <Alert variant='success'>Logged in sucessfully</Alert>
                <Redirect to='/hotel' />
              </div>
            )}
            {this.state.message == 'incorrect' && (
              <Alert variant='danger'>Invalid Credentials</Alert>
            )}
            <Card.Text>
              New User <Link to='/register'>Register</Link>
            </Card.Text>
          </Card.Body>
        </Card>
      </Fragment>
    );
  };
}

export default Login;
