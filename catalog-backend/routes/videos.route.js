const express = require('express');
const router = express.Router();
// Colocar controller que ainda não foi criado
const video_controller = require('../controllers/video.controller');
// teste simples

router.get('/', video_controller.index);
router.get('/:id', video_controller.show);
router.post('/', video_controller.create);
router.put('/:id', video_controller.update);
module.exports = router;