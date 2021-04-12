const express = require('express');
const router = express.Router();
const checkAuth = require('../checkAuth.js');
const onlineOrders_controller = require('../controllers/onlineOrders_controller.js');

router.get('/get', checkAuth,onlineOrders_controller.onlineOrders_get);
router.get('/:id', checkAuth,onlineOrders_controller.onlineOrders_getByOrderNumber);
router.get('/getByUser/:id', checkAuth,onlineOrders_controller.onlineOrders_getByUser);
router.post('/post', checkAuth,onlineOrders_controller.onlineOrders_postImage,onlineOrders_controller.onlineOrders_post);
router.put('/:id', checkAuth,onlineOrders_controller.onlineOrders_reject);
router.put('/cashier/:id', checkAuth,onlineOrders_controller.onlineOrders_cashier_update);

module.exports = router;