const User = require('../Models/User');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  const { name, email, password, mobile } = req.body;

  if (!name || !email || !password || !mobile) {
    return res.status(400).json({
      message: 'Incomplete credentials',
    });
  }

  try {
    let userexist = await User.find({ email: email });

    if (userexist) {
      return res.status(200).send('user exists');
    }

    var data = {
      name: name,
      email: email,
      password: password,
      mobile: mobile,
    };
    User.create(data, function (err, response) {
      if (err) {
        console.log('error >>>>>', err);
      }
      return res.status(201).json({
        message: 'success',
        user: response,
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).send('Server error');
  }
});

router.get('/:user', async (req, res) => {
  const email = req.query.email;
  const password = req.query.password;

  console.log(email, password);

  if (!email || !password) {
    return res.status(400).send('credentials not found');
  }

  let user = await User.findOne({
    email: email,
    password: password,
  });
  if (user) {
    return res.status(200).json({
      message:'success',
      user:user
    });
  }
});



module.exports = router;
