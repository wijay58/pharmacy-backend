const express = require('express');
const router = express.Router();
const customer_controller = require('../controllers/customer_controller.js');
const checkAuth = require('../checkAuth.js');

router.post('/post', customer_controller.customer_post);
router.post('/login', customer_controller.customer_login);
router.get('/get', checkAuth,customer_controller.customer_get);
router.delete('/:id', checkAuth,customer_controller.customer_delete);
router.put('/:id', checkAuth,customer_controller.customer_update);

module.exports = router;