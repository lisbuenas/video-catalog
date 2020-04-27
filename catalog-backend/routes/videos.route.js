const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const videoController = require('../controllers/video.controller');

router.get('/', verifyJWT, videoController.index);
router.get('/:id', verifyJWT, videoController.show);
router.post('/', verifyJWT, videoController.create);
router.put('/:id', verifyJWT, videoController.update);
router.delete('/:id', verifyJWT, videoController.delete);
module.exports = router;

function verifyJWT(req, res, next) {
  let token = req.headers.authorization.substring(
    8,
    req.headers.authorization.length - 1
  );

  if (!token)
    return res.status(401).send({ auth: false, message: 'Missing token' });

  jwt.verify(token, process.env.SECRET, function (err, decoded) {
    if (err)
      return res.status(403).send({ auth: false, message: 'Invalid token' });

    req.userId = decoded.id;
    console.log('User Id: ' + decoded.id);
    next();
  });
}
