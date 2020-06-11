const Room = require('../Models/Room');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  const { roomname, price } = req.body;
  if (!roomname || !price) {
    return res.status(400).send('no values found');
  }

  try {
    let roomexist = await Room.findOne({ roomname: roomname });
    if (roomexist) {
      return res.status(200).send('room exists');
    }

    Room.create({ roomname, price }, function (err, response) {
      if (err) res.status(500).send('server error');
      return res.status(201).json({
        message: 'success',
        room: response,
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).send('server error');
  }
});

router.get('/', async (req, res) => {
  try {
    let rooms = await Room.find();
    return res.status(200).json({
      message: 'success',
      rooms: rooms,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send('server error');
  }
});

router.put('/', async (req, res) => {
  const { roomname, price } = req.body;
  if (!roomname || !price) {
    return res.status(400).send('no values found');
  }
  try {
    let roomexist = await Room.findOne({ roomname });

    if (roomexist) {
      let room = await Room.findOneAndUpdate({
        roomname,
        price,
      });
      return res.status(201).json({
        message: 'success',
        room: room,
      });
    } else {
      return res.status(400).send('room not found');
    }
  } catch (error) {
    console.log(error);
    res.status(500).send('server error');
  }
});

router.delete('/', async (req, res) => {
  const { roomname } = req.body;
  if (!roomname) {
    return res.status(400).send('no values found');
  }
  

  try {
    let room = await Room.findOneAndDelete({
      roomname,
    });
    console.log(room);
    return res.status(201).json({
      message: 'success',
      room: room,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send('server error');
  }
});

module.exports = router;
