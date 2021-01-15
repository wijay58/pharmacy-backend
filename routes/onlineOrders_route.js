const express = require('express');
const router = express.Router();
const checkAuth = require('../checkAuth.js');
const onlineOrders_controller = require('../controllers/onlineOrders_controller.js');

router.get('/get', checkAuth,onlineOrders_controller.onlineOrders_get);
router.get('/getByUser/:id', checkAuth,onlineOrders_controller.onlineOrders_getByUser);
router.post('/post', checkAuth,onlineOrders_controller.onlineOrders_postImage,onlineOrders_controller.onlineOrders_post);
router.delete('/:id', checkAuth,onlineOrders_controller.onlineOrders_delete);
router.put('/cashier/:id', checkAuth,onlineOrders_controller.onlineOrders_cashier_update);

module.exports = router;