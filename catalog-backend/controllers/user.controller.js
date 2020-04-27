const User = require('../models/users.model');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
  create: function (req, res, next) {
    User.findOne({ email: req.body.email }, function (err, user) {
      if (err) {
      }
      //if a user was found, that means the user's email matches the entered email
      if (user) {
        return res.status(409).send({
          status: 'error',
          message:
            'A user with that email has already registered. Please use a different email..',
        });
      } else {
        //code if no user with entered email was found
        User.create(
          {
            email: req.body.email,
            password: req.body.password,
          },
          function (err, result) {
            if (err) next(err);
            else
              res.json({
                status: 'success',
                message: 'User added successfully!!!',
                data: null,
              });
          }
        );
      }
    });
  },

  authenticate: function (req, res, next) {
    if (!req.body.email || !req.body.password)
      return res
        .status(400)
        .send({ status: 400, message: 'Invalid email / password!!!' });

    let password = req.body.password;

    User.findOne({ email: req.body.email }, function (err, userInfo) {
      if (err) {
        return res.status(400).send({ status: 400, message: 'Invalid email' });
      } else {
        if (!userInfo)
          return res
            .status(418)
            .send({ status: 400, message: 'Invalid email' });

        if (bcrypt.compareSync(password, userInfo.password)) {
          const token = jwt.sign(
            { id: userInfo._id },
            'MIIBOAIBAAJAUw453gGcKgc5d//PVe9eyJ9BKT2Mpu9NqLGDYSG0ZexnV0mvI2Bn',
            {
              expiresIn: '1000h',
            }
          );

          res.json({
            status: 'success',
            message: 'user found!!!',
            data: { user: userInfo, token: token },
          });
        } else {
          return res
            .status(418)
            .send({ status: 'error', message: 'Invalid email/password!!!' });
        }
      }
    });
  },
};
