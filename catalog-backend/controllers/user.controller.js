const User = require('../models/users.model');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
  create: function (req, res, next) {
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
  },
  authenticate: function (req, res, next) {
    if (!req.body.email || !req.body.password)
      return res
        .status(418)
        .send({ status: 'error', message: 'Invalid email/password!!!' });

    User.findOne({ email: req.body.email }, function (err, userInfo) {
      if (err) {
        next(err);
      } else {
        if (bcrypt.compareSync(req.body.password, userInfo.password)) {
          const token = jwt.sign({ id: userInfo._id }, process.env.SECRET, {
            expiresIn: '1h',
          });
          res.json({
            status: 'success',
            message: 'user found!!!',
            data: { user: userInfo, token: token },
          });
        } else {
          res.json({
            status: 'error',
            message: 'Invalid email/password!!!',
            data: null,
          });
        }
      }
    });
  },
};
