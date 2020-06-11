/*eslint-disable*/

import React, { Component } from 'react';
import { Fragment } from 'react';
import {
  InputGroup,
  FormControl,
  Button,
  Card,
  Accordion,
  Navbar,
  Form,
  Nav,
  Badge,
} from 'react-bootstrap';
import axios from 'axios';
import '../App.css';

class Admin extends Component {
  state = {
    roomname: '',
    price: '',

    rooms: [],
    bookings: [],
  };

  async componentDidMount() {
    let rooms = await axios.get('/room');
    let bookings = await axios.get('/booking');
    console.log(bookings.data);
    this.setState({
      rooms: this.state.rooms.concat(rooms.data.rooms),
      bookings: this.state.bookings.concat(bookings.data.bookings),
    });
  }

  HandleName = (roomname) => {
    this.setState({
      roomname: roomname,
    });
  };

  HandlePrice = (price) => {
    this.setState({
      price: price,
    });
  };

  Add = async () => {
    if (!this.state.roomname || !this.state.price) {
      return;
    }
    let room = await axios.post('/room', {
      roomname: this.state.roomname,
      price: this.state.price,
    });
    console.log(room.data);
    window.location.reload();
  };

  Edit = async () => {
    if (this.state.roomname == '') {
      return;
    }
    let room = await axios.put('/room', {
      roomname: this.state.roomname,
      price: this.state.price,
    });
    console.log(room.data.room);
    window.location.reload();
  };

  DeleteRoom = async (roomname) => {
    console.log(roomname);
    let room = await axios.delete('/room', {
      data: {
        roomname: roomname,
      },
    });
    console.log(room.data.room);
    window.location.reload();
  };

  DeleteBooking = async (booking) => {
    console.log(roomname);
    let book = await axios.delete('/booking', {
      data: {
        booking,
      },
    });
    console.log(book.data.book);
    window.location.reload();
  };

  render() {
    return (
      <Fragment>
        <Navbar bg='dark' variant='dark'>
          <Navbar.Brand href='#home'>MyTrip</Navbar.Brand>
          <Nav className='mr-auto'>
            <Nav.Link href='/hotel'>Rooms</Nav.Link>
            <Nav.Link href='/'>Login</Nav.Link>
          </Nav>
        </Navbar>

        <div className='admin offset-md-4'>
          <h1>
            <Badge variant='warning'>Rooms</Badge>
          </h1>
          <InputGroup className='mb-3'>
            <InputGroup.Prepend>
              <InputGroup.Text id='roomname'>Name</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              placeholder='Room Name'
              aria-label='roomname'
              aria-describedby='roomname'
              onChange={(event) => {
                this.HandleName(event.target.value);
              }}
            />
          </InputGroup>
          <InputGroup className='mb-3'>
            <FormControl
              placeholder='Price'
              aria-label='price'
              aria-describedby='price'
              onChange={(event) => {
                this.HandlePrice(event.target.value);
              }}
            />
            <InputGroup.Append>
              <InputGroup.Text id='price'>₹</InputGroup.Text>
            </InputGroup.Append>
          </InputGroup>

          <Button
            variant='outline-success'
            onClick={() => {
              this.Add();
            }}>
            Add
          </Button>
          <Button className = 'ml-3'
            variant='outline-info'
            onClick={() => {
              this.Edit();
            }}>
            Edit
          </Button>
          <br />
          <br />

          {this.state.rooms &&
            this.state.rooms.map((room) => {
              return (
                <Fragment>
                  <Accordion>
                    <Card>
                      <Card.Body>
                        <Card.Title>{room.roomname}</Card.Title>
                        <Card.Text>{room.price}</Card.Text>
                        <Card.Header>
                          <Button
                            variant='danger'
                            onClick={() => {
                              this.DeleteRoom(room.roomname);
                            }}>
                            Delete
                          </Button>
                        </Card.Header>
                      </Card.Body>
                    </Card>
                  </Accordion>
                  <br />
                  <br />
                </Fragment>
              );
            })}
          <h1>
            <Badge variant='warning'>Bookings</Badge>
          </h1>
          {this.state.bookings &&
            this.state.bookings.map((booking) => {
              return (
                <Card>
                  <Card.Body>
                    <Card.Title>Customer Name: {booking.username}</Card.Title>
                    <Card.Text>Room Name: {booking.roomname}</Card.Text>
                    <Card.Header>
                      <Button
                        variant='danger'
                        onClick={() => {
                          this.DeleteBooking(booking._id);
                        }}>
                        Delete
                      </Button>
                    </Card.Header>
                  </Card.Body>
                </Card>
              );
            })}
        </div>
      </Fragment>
    );
  }
}

export default Admin;
