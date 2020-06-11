const Booking = require('../Models/Booking');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  const { roomname, price, username, useremail, userid } = req.body;
  if (!roomname || !price || !useremail || !username || !userid) {
    return res.status(400).send('no values found');
  }

  try {
    var data = { roomname, price, username, useremail, userid };
    Booking.create(data, function (err, response) {
      if (err) {
        console.log(err);
        return res.status(500).send('server error');
      }

      return res.status(201).json({
        message: 'success',
        booking: response,
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).send('server error');
  }
});

router.get('/', async (req, res) => {
  try {
    let bookings = await Booking.find();
    return res.status(200).json({
      message: 'success',
      bookings: bookings,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send('server error');
  }
});

router.delete('/', async (req, res) => {
  const { booking } = req.body;
  if (!booking) {
    return res.status(400).send('no values found');
  }
  try {
    let book = await Booking.findOneAndDelete({
      _id: booking,
    });
    console.log(book);
    return res.status(201).json({
      message: 'success',
      book: book,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send('server error');
  }
});

module.exports = router;
