import React, { Component } from 'react';
import axios from 'axios';
import { Fragment } from 'react';
import { Card, Button, Navbar, Nav } from 'react-bootstrap';
import '../App.css';

class Hotel extends Component {
  state = {
    rooms: [],
  };

  async componentDidMount() {
    let hotels = await axios.get('/room');
    console.log(hotels.data.rooms);
    this.setState({
      rooms: this.state.rooms.concat(hotels.data.rooms),
    });
  }

  Book = async (roomname, price) => {
    let userid = window.localStorage.getItem('id');
    let username = window.localStorage.getItem('name');
    let useremail = window.localStorage.getItem('email');
    let booking = await axios.post('/booking', {
      userid,
      username,
      useremail,
      roomname,
      price,
    });
    console.log(booking.data);
    alert("Booked")
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
        <div className='user'>
          {this.state.rooms &&
            this.state.rooms.map((room) => {
              return (
                <Card className = 'mr-auto' style={{ width: '18rem'}}>
                  <Card.Body >
                    <Card.Title>Room: {room.roomname}</Card.Title>
                    <Card.Text>Price: {room.price}</Card.Text>
                    <Button
                      variant='primary'
                      onClick={() => {
                        this.Book(room.roomname, room.price);
                      }}>
                      Select
                    </Button>
                  </Card.Body>
                </Card>
              );
            })}
        </div>
      </Fragment>
    );
  }
}

export default Hotel;
