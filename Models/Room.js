const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema(
  {
    roomname: {
      type: String,
    },
    price: {
      type: Number,
    },
  },
  {
    collection: 'room',
  }
);

const Room = mongoose.model('Room', RoomSchema);

module.exports = Room;
