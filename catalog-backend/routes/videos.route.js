const express = require('express');
const router = express.Router();

const video_controller = require('../controllers/video.controller');

router.get('/', verifyJWT, video_controller.index);
router.get('/:id', video_controller.show);
router.post('/', video_controller.create);
router.put('/:id', video_controller.update);
module.exports = router;


//função que verifica se o JWT é ok
function verifyJWT(req, res, next){ 
    var token = req.headers['x-access-token']; 
    if (!token) 
        return res.status(401).send({ auth: false, message: 'Token não informado.' }); 
    
    jwt.verify(token, secret, function(err, decoded) { 
        if (err) 
            return res.status(500).send({ auth: false, message: 'Token inválido.' }); 
        
        req.userId = decoded.id; 
        console.log("User Id: " + decoded.id)
        next(); 
    }); 
}  