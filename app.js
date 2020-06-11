const express = require('express');
const app = express();
const mongoose = require('mongoose');
// var cors = require('cors');

//
const usersRoute = require('./Controllers/users');
const roomsRoute = require('./Controllers/rooms');
const bookingsRoute = require('./Controllers/bookings')


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.connect(
  'mongodb+srv://root:root@cluster0-f5s1y.mongodb.net/booking?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  }
);

app.use('/user', usersRoute);
app.use('/room', roomsRoute);
app.use('/booking', bookingsRoute);

// app.use(cors());

module.exports = app;
