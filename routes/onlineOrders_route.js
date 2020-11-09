const express = require('express');
const router = express.Router();
const onlineOrders_controller = require('../controllers/onlineOrders_controller.js');

router.get('/get', onlineOrders_controller.onlineOrders_get);
router.post('/post', onlineOrders_controller.onlineOrders_post);
router.delete('/:id', onlineOrders_controller.onlineOrders_delete);

module.exports = router;