const express = require('express');
const router = express.Router();
const user_controller = require('../controllers/user_controller.js');

router.post('/post', user_controller.user_post);
router.post('/login', user_controller.user_login);
router.get('/get', user_controller.user_get);
router.delete('/:id', user_controller.user_delete);
router.put('/:id', user_controller.user_update);

module.exports = router;
