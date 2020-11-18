const express = require('express');
const router = express.Router();
const user_controller = require('../controllers/user_controller.js');
const jwt = require('jsonwebtoken');
const checkAuth = require('../checkAuth.js');

router.post('/post', checkAuth,user_controller.user_post);
router.post('/login', user_controller.user_login);
router.get('/checkauth/:token', function(req,res){
    try {
        let decoded = jwt.verify(req.params.token, process.env.SECRET);
        req.userData = decoded;
        return res.status(200).json({user:decoded,message:"Auth Successful."})
    } catch (err) {
        return res.status(401).send({message: 'Auth Failed.Please Sign in again to continue.'});
    }
});
router.get('/get', checkAuth,user_controller.user_get);
router.delete('/:id', checkAuth,user_controller.user_delete);
router.put('/:id', checkAuth,user_controller.user_update);

module.exports = router;
