const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema(
  {
    username: {
      type: String,
    },
    useremail: {
      type: String,
    },
    userid: {
      type: String,
    },
    roomname: {
      type: String,
    },
    price: {
      type: Number,
    },
  },
  {
    collection: 'bookings',
  }
);

const Booking = mongoose.model('Booking', BookingSchema);

module.exports = Booking;
